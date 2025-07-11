import { BaseSelect, LOGS, PrismaService } from '@api/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CataloguePaginationInput } from './pagination.input';
import { Catalogue } from './catalogue.model';
import { CatalogueUpdateInput } from './update.input';
import { CatalogueCreateInput } from './create.input';
import { CatalogueSelectInput } from './select.input';
import { CataloguePaginationOutput } from './catalogue.output';

import { CatalogueException, CatalogueFileType, CatalogueType } from './catalogue.enum';
import { UploadService } from '../upload';
import { File as UploadFile } from '../file';
import { MultipartFile } from '@fastify/multipart';
import { v4 } from 'uuid';
import { TemplateService } from '@api/core';
import { cloneDeep, get, set } from 'lodash-es';
import * as archiver from 'archiver';
import { FastifyReply } from 'fastify';
import { createWriteStream, mkdtemp, promises, readFile, rm } from 'fs-extra';
import { join } from 'node:path';
import { SchemaData } from '../schema-data';

@Injectable()
export class CatalogueService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
    private templateService: TemplateService,
  ) {}

  RESOURCE_FILE_TYPE = 'file-type';
  RESOURCE_MEDIA_TYPE = 'media';
  RESOURCE_TEXT_TYPE = 'text';

  async catalogues(
    input: CataloguePaginationInput,
    select: BaseSelect,
  ): Promise<CataloguePaginationOutput> {
    const { where } = input;
    return {
      data: (await this.prisma.catalogue.findMany({ ...input, ...select })) as Catalogue[],
      count: await this.prisma.catalogue.count({ where }),
    };
  }

  async catalogueSelect(input: CatalogueSelectInput, select: BaseSelect) {
    return (await this.prisma.catalogue.findMany({ ...input, ...select })) as Catalogue[];
  }

  async catalogue(id: string, select: BaseSelect) {
    return (await this.prisma.catalogue.findUnique({ where: { id }, ...select })) as Catalogue;
  }

  async update(input: CatalogueUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.catalogue.update({
      data,
      where: { id },
    });
  }

  async create(input: CatalogueCreateInput) {
    let { resourceId, variableId, pid, fileType, ...other } = input;
    if (!fileType) {
      fileType = await this.fileType(input.name);
    }
    const data = {
      ...other,
      fileType,
      resource: { connect: { id: resourceId } },
      parent: {},
      variable: {},
    };
    if (pid) {
      data.parent = { connect: { id: pid } };
    }
    if (variableId) {
      data.variable = { connect: { id: variableId } };
    }
    return await this.prisma.catalogue.create({
      data,
    });
  }

  private async fileType(name: string) {
    const ext = this.getFileExtension(name);
    let fileType: CatalogueFileType = CatalogueFileType.UnKnown;
    if (ext) {
      const fileTypes = await this.getFileTypes();
      fileType = this.toPascalCase(this.getFileType(ext, fileTypes)) as CatalogueFileType;
    }
    return fileType;
  }

  async delete(id: string) {
    return await this.prisma.catalogue.delete({ where: { id } });
  }

  async preview(id: string, schemaDataIds?: string[]) {
    const catalogue = await this.prisma.catalogue.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        content: true,
        name: true,
        resourceId: true,
        many: true,
        variableId: true,
        variable: {
          select: {
            code: true,
            value: true,
            variableCategory: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });
    if (!catalogue) {
      return null;
    }

    const { content, many, variableId } = catalogue;
    if (content === null) {
      return catalogue;
    }

    const schemaDatas = await this.getSchemaDatas(schemaDataIds);
    const vars = await this.getResourceVars(catalogue.resourceId, schemaDatas);

    if (many && variableId) {
      const manySchemaData = schemaDatas.find((x) => x.formId === variableId);
      if (manySchemaData) {
        const data = (get(manySchemaData, 'data.$root') as Array<any>) ?? [];
        const properties = (get(manySchemaData, 'schema.json.items.properties') ?? {}) as object;
        const catalogues: any[] = [];
        for (let item of data) {
          const deep = cloneDeep(catalogue);
          for (let key in properties) {
            set(
              vars,
              `${deep.variable.variableCategory.code}.${deep.variable.code}.$item.${key}`,
              item[key],
            );
          }
          deep.id = v4();
          deep.content = this.templateService.generate(catalogue.content, vars);
          deep.name = this.templateService.generate(catalogue.name, vars);

          catalogues.push(deep);
        }
        return catalogues;
      } else {
        return catalogue;
      }
    } else {
      catalogue.content = this.templateService.generate(catalogue.content, vars);
      catalogue.name = this.templateService.generate(catalogue.name, vars);
      return catalogue;
    }
  }

  async getSchemaDatas(schemaDataIds: string[]) {
    let schemaDatas: SchemaData[] = [];
    if (schemaDataIds && schemaDataIds.length > 0) {
      schemaDatas = await this.prisma.schemaData.findMany({
        where: {
          id: {
            in: schemaDataIds,
          },
        },
        select: {
          id: true,
          data: true,
          schemaId: true,
          formId: true,
          schema: {
            select: {
              id: true,
              name: true,
              code: true,
              json: true,
            },
          },
        },
      });
    }
    return schemaDatas;
  }

  async categoryPreview(resourceId: string, schemaDataIds?: string[]) {
    const catalogues = await this.prisma.catalogue.findMany({
      where: { resourceId },
      select: {
        id: true,
        pid: true,
        type: true,
        content: true,
        name: true,
        resourceId: true,
        many: true,
        sort: true,
        resource: {
          select: {
            name: true,
            code: true,
          },
        },
        variableId: true,
        variable: {
          select: {
            code: true,
            value: true,
            variableCategory: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });
    const schemaDatas = await this.getSchemaDatas(schemaDataIds);
    const vars = await this.getResourceVars(resourceId, schemaDatas);
    const manyList: (Catalogue & any)[] = [];
    const deleteIds: string[] = [];

    for (let catalogue of catalogues) {
      const { many, variableId } = catalogue;
      if (many && variableId) {
        const manySchemaData = schemaDatas.find((x) => x.formId === variableId);
        if (manySchemaData) {
          const data = (get(manySchemaData, 'data.$root') as Array<any>) ?? [];
          const properties = (get(manySchemaData, 'schema.json.items.properties') ?? {}) as object;
          for (let item of data) {
            const deep = cloneDeep(catalogue);
            for (let key in properties) {
              set(
                vars,
                `${deep.variable.variableCategory.code}.${deep.variable.code}.$item.${key}`,
                item[key],
              );
            }
            deep.id = v4();
            deep.content = this.templateService.generate(catalogue.content, vars);
            deep.name = this.templateService.generate(catalogue.name, vars);

            manyList.push(deep);
          }
          deleteIds.push(catalogue.id);
        }
      } else {
        catalogue.content = this.templateService.generate(catalogue.content, vars);
        catalogue.name = this.templateService.generate(catalogue.name, vars);
      }
    }
    const finallyList = catalogues.filter((x) => !deleteIds.includes(x.id));

    return [...finallyList, ...manyList];
  }

  async categoryDownload(resourceId: string, reply: FastifyReply, schemaDataIds?: string[]) {
    const resource = await this.prisma.resource.findUnique({ where: { id: resourceId } });
    const catalogues = await this.categoryPreview(resourceId, schemaDataIds);
    await this.downloadZip(catalogues as any[], reply, resource.name);
  }

  buildCatalogueTree(catalogues: Catalogue[]): Catalogue[] {
    const map = new Map<string, Catalogue & { children?: Catalogue[] }>();

    catalogues.forEach((node) => {
      map.set(node.id, { ...node, children: [] });
    });

    const roots: Catalogue[] = [];

    catalogues.forEach((node) => {
      const current = map.get(node.id)!;
      if (node.pid && map.has(node.pid)) {
        map.get(node.pid)?.children?.push(current);
      } else {
        roots.push(current);
      }
    });

    return roots;
  }

  async downloadZip(catalogues: Catalogue[], reply: FastifyReply, filename: string) {
    const tempPath = join(process.cwd(), 'temp');
    await promises.mkdir(tempPath, { recursive: true });
    const tempDir = await mkdtemp(join(tempPath, 'catalogue-'));

    const zipFilePath = `${tempDir}.zip`;
    const output = createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    try {
      const rootNodes = this.buildCatalogueTree(catalogues);
      await this.writeCatalogueToDisk(rootNodes, tempDir);

      archive.pipe(output);
      archive.directory(tempDir, false);

      await new Promise((resolve, reject) => {
        let archiveFinished = false;
        let outputClosed = false;

        const checkCompletion = () => {
          if (archiveFinished && outputClosed) {
            resolve('zip file created');
          }
        };

        archive.on('finish', () => {
          LOGS.info('Archive finished', { context: CatalogueService.name });
          archiveFinished = true;
          checkCompletion();
        });
        archive.on('error', (err) => {
          LOGS.error(`Archiver error: ${JSON.stringify(err)}`, { context: CatalogueService.name });
          reject(err);
        });

        output.on('close', () => {
          LOGS.info('Zip file completed', { context: CatalogueService.name });
          outputClosed = true;
          checkCompletion();
        });
        output.on('error', (err) => {
          LOGS.error(`Write stream error: ${JSON.stringify(err)}`, {
            context: CatalogueService.name,
          });
          reject(err);
        });

        archive.finalize();
      });

      const { size } = await promises.stat(zipFilePath);
      if (size === 0) {
        throw new Error('Generated zip file is empty');
      }

      const stream = await readFile(zipFilePath);
      reply.header('Content-Type', 'application/zip');
      reply.header(
        `Content-Disposition`,
        `attachment; filename=${encodeURIComponent(filename)}.zip`,
      );
      reply.header('Content-Length', size);

      reply.send(stream);
    } catch (error) {
      LOGS.error(`Error during processing: ${JSON.stringify(error)}`, {
        context: CatalogueService.name,
      });
      try {
        await rm(tempDir, { recursive: true, force: true });
      } catch (rmErr) {
        LOGS.error(`Error removing temp directory: ${JSON.stringify(rmErr)}`, {
          context: CatalogueService.name,
        });
      }
      throw new Error('Failed to process and zip catalogues.');
    } finally {
      await rm(tempDir, { recursive: true, force: true });
      await rm(zipFilePath, { recursive: true, force: true });
    }
  }

  async writeCatalogueToDisk(nodes: (Catalogue & { children?: any })[], basePath: string) {
    for (const node of nodes) {
      const path = join(basePath, node.name);

      if (node.type === CatalogueType.Folder) {
        await promises.mkdir(path, { recursive: true });
        if (node.children?.length) {
          await this.writeCatalogueToDisk(node.children, path);
        }
      } else if (node.type === CatalogueType.File) {
        if (node.url) {
          const sourcePath = join(process.cwd(), node.url);
          try {
            await promises.copyFile(sourcePath, path);
          } catch (error) {
            LOGS.error(
              `Failed to copy file from ${sourcePath} to ${path}: ${JSON.stringify(error)}`,
              {
                context: CatalogueService.name,
              },
            );
          }
        } else {
          await promises.writeFile(path, node.content ?? '', 'utf8');
        }
      }
    }
  }

  async folderUpload(files: MultipartFile[], body: { filepath: string; resourceId: string }) {
    const { filepath, resourceId } = body;
    if (!resourceId) {
      throw new BadRequestException({ message: CatalogueException.NoCategorySelected });
    }

    if (files.length === 0) {
      throw new BadRequestException({ message: CatalogueException.FilesIsNull });
    }

    const hostUrl = ``;

    const fileTypes = await this.getFileTypes();
    const { text } = fileTypes;

    const results: any[] = await Promise.all(
      files.map(async (file: any) => {
        const ext = this.getFileExtension(file.name);

        if (text.includes(ext)) {
          return await this.getFileText(file);
        } else {
          return await this.uploadService.localFastify(file, { filepath }, hostUrl);
        }
      }),
    );

    const data = this.convertToCatalogueTree(results, resourceId);
    const transaction: any[] = [];

    for (const item of data) {
      const { resourceId, pid, ...other } = item;
      const data = { ...other, resource: { connect: { id: resourceId } }, parent: {} };
      if (pid) {
        data.parent = { connect: { id: pid } };
      }
      const created = this.prisma.catalogue.create({
        data,
      });
      transaction.push(created);
    }

    return await this.prisma.$transaction(transaction);
  }

  private convertToCatalogueTree(files: UploadFile[], resourceId: string) {
    const result: any[] = [];
    const folderMap: Map<string, string> = new Map();
    let sortCounter = 0;

    for (const file of files) {
      const parts = decodeURIComponent(file.name).split('/').slice(1);
      let currentPath = '';
      let parentId: string | undefined = undefined;

      for (let i = 0; i < parts.length - 1; i++) {
        const folderName = parts[i];
        currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;

        if (!folderMap.has(currentPath)) {
          const folderId = v4();
          const folder = {
            id: folderId,
            name: folderName,
            type: CatalogueType.Folder,
            sort: sortCounter++,
            resourceId: resourceId,
            pid: parentId,
          };
          result.push(folder);
          folderMap.set(currentPath, folderId);
        }

        parentId = folderMap.get(currentPath);
      }

      const fileNode = {
        id: v4(),
        name: parts[parts.length - 1],
        content: file.content,
        type: CatalogueType.File,
        sort: sortCounter++,
        many: false,
        url: file.url,
        resourceId,
        pid: parentId,
      };
      result.push(fileNode);
    }

    return result;
  }

  private async getResourceVars(
    resourceId: string,
    schemaDatas?: SchemaData[],
  ): Promise<{ [code: string]: any }> {
    const variables = await this.prisma.variable.findMany({
      where: { resourceId: { equals: resourceId } },
      select: {
        id: true,
        code: true,
        value: true,
        source: true,
        type: true,
        variableCategory: { select: { code: true } },
      },
      orderBy: [{ variableCategory: { sort: 'asc' } }, { sort: 'asc' }],
    });

    const vars: { [code: string]: any } = {};
    for (let variable of variables) {
      const { id, code, value, type, source, variableCategory } = variable;
      if (type === 'json-schema' && value) {
        if (source === 'schema') {
          const schema = await this.prisma.schema.findUnique({
            where: { id: value as string },
            select: { json: true },
          });
          if (!schema) continue;
          set(vars, `${variableCategory.code}.${code}`, schema.json);
        } else if (source === 'schema-json') {
          const schemaData = schemaDatas.find((x) => x.schemaId === value && x.formId === id);
          if (!schemaData) continue;
          set(vars, `${variableCategory.code}.${code}`, schemaData.data);
        }
      } else {
        set(vars, `${variableCategory.code}.${code}`, value);
      }
    }

    return vars;
  }

  private getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex === -1 ? '' : filename.slice(lastDotIndex);
  }

  private async getFileTypes() {
    const fileTypes = await this.prisma.resource.findMany({
      where: { pid: null, subject: { code: { equals: this.RESOURCE_FILE_TYPE } } },
      include: { children: true },
    });

    const result: { [fileType: string]: string[] } = {};
    for (let item of fileTypes) {
      result[item.code] = item.children.map((x) => x.code);
    }

    return result;
  }

  private async getFileText(file: File): Promise<UploadFile> {
    const result: UploadFile = { name: file.name };

    try {
      result.content = Buffer.from(await file.arrayBuffer()).toString();
    } catch (error) {
      result.content = '';
    }

    return result;
  }

  private getFileType(ext: string, fileTypes: Record<string, string[]>): string | null {
    for (const type in fileTypes) {
      if (fileTypes[type].includes(ext)) {
        return type;
      }
    }
    return null;
  }

  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
