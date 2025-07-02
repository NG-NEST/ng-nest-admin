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
import { set } from 'lodash-es';
import * as archiver from 'archiver';
import { FastifyReply } from 'fastify';
import { createWriteStream, mkdtemp, promises, readFile, rm } from 'fs-extra';
import { join } from 'node:path';
import { JsonValue } from '@prisma/client/runtime/library';

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
    const catalogue = (await this.prisma.catalogue.findUnique({
      where: { id },
      select: { content: true, name: true, resourceId: true },
    })) as Catalogue;
    if (!catalogue) {
      return null;
    }
    if (catalogue.content === null) {
      throw new BadRequestException({ message: CatalogueException.ContentIsNull });
    }

    const vars = await this.getResourceVars(catalogue.resourceId, schemaDataIds);

    catalogue.content = this.templateService.generate(catalogue.content, vars);
    catalogue.name = this.templateService.generate(catalogue.name, vars);

    return catalogue;
  }

  async categoryPreview(resourceId: string, schemaDataIds?: string[]): Promise<Catalogue[]> {
    const catalogues = await this.prisma.catalogue.findMany({
      where: { resourceId },
    });
    const vars = await this.getResourceVars(resourceId, schemaDataIds);
    for (let catalogue of catalogues) {
      const { content, type, name } = catalogue;
      if (type === 'File') {
        catalogue.content = this.templateService.generate(content, vars);
        catalogue.name = this.templateService.generate(name, vars);
      } else if (type === 'Folder') {
        catalogue.name = this.templateService.generate(name, vars);
      }
    }

    return catalogues as Catalogue[];
  }

  async categoryDownload(resourceId: string, reply: FastifyReply, schemaDataIds?: string[]) {
    const resource = await this.prisma.resource.findUnique({ where: { id: resourceId } });

    const catalogues = await this.categoryPreview(resourceId, schemaDataIds);

    // 创建临时目录
    const tempPath = join(process.cwd(), 'temp');
    await promises.mkdir(tempPath, { recursive: true });
    const tempDir = await mkdtemp(join(tempPath, 'catalogue-'));

    // 生成临时压缩文件路径
    const zipFilePath = `${tempDir}.zip`;
    const output = createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    try {
      // 构建树状结构并写入文件
      const rootNodes = this.buildCatalogueTree(catalogues);
      await this.writeCatalogueToDisk(rootNodes, tempDir);

      // 压缩目录到临时文件
      archive.pipe(output);
      archive.directory(tempDir, false);

      // 合并压缩完成和文件写入完成的监听
      await new Promise((resolve, reject) => {
        let archiveFinished = false;
        let outputClosed = false;

        const checkCompletion = () => {
          if (archiveFinished && outputClosed) {
            resolve('zip file created');
          }
        };

        archive.on('finish', () => {
          console.log('archive finished');
          archiveFinished = true;
          checkCompletion();
        });
        archive.on('error', (err) => {
          console.error('Archiver error:', err);
          reject(err);
        });

        output.on('close', () => {
          console.log('zip file completed');
          outputClosed = true;
          checkCompletion();
        });
        output.on('error', (err) => {
          console.error('Write stream error:', err);
          reject(err);
        });

        // 确保开始压缩
        archive.finalize();
      });

      // 检查压缩文件大小
      const { size } = await promises.stat(zipFilePath);
      if (size === 0) {
        throw new Error('Generated zip file is empty');
      }

      const stream = await readFile(zipFilePath);
      reply.header('Content-Type', 'application/zip');
      reply.header(
        `Content-Disposition`,
        `attachment; filename=${encodeURIComponent(resource.name)}.zip`,
      );
      reply.header('Content-Length', size);

      reply.send(stream);
    } catch (error) {
      console.error('Error during processing:', error);
      // 清理临时目录
      try {
        await rm(tempDir, { recursive: true, force: true });
      } catch (rmErr) {
        console.error('Error removing temp directory:', rmErr);
      }
      throw new Error('Failed to process and zip catalogues.');
    } finally {
      // 清理临时目录

      await rm(tempDir, { recursive: true, force: true });
      await rm(zipFilePath, { recursive: true, force: true });
    }
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

  async writeCatalogueToDisk(nodes: (Catalogue & { children?: any })[], basePath: string) {
    for (const node of nodes) {
      const path = join(basePath, node.name);

      if (node.type === CatalogueType.Folder) {
        await promises.mkdir(path, { recursive: true });
        if (node.children?.length) {
          await this.writeCatalogueToDisk(node.children, path);
        }
      } else if (node.type === CatalogueType.File) {
        await promises.writeFile(path, node.content ?? '', 'utf8');
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
    schemaDataIds?: string[],
  ): Promise<{ [code: string]: any }> {
    const variables = await this.prisma.variable.findMany({
      where: { resourceId: { equals: resourceId } },
      select: {
        id: true,
        code: true,
        value: true,
        type: true,
        variableCategory: { select: { code: true } },
      },
    });
    let schemaDatas: { data: JsonValue; schemaId: string; formId: string }[] = [];
    if (schemaDataIds && schemaDataIds.length > 0) {
      schemaDatas = await this.prisma.schemaData.findMany({
        where: { id: { in: schemaDataIds } },
        select: { data: true, schemaId: true, formId: true },
      });
    }

    const vars: { [code: string]: any } = {};
    for (let variable of variables) {
      const { id, code, value, type, variableCategory } = variable;
      if (type === 'json-schema' && value) {
        try {
          const schemaData = schemaDatas.find((x) => x.schemaId === value && x.formId === id);
          if (!schemaData) continue;
          set(vars, `${variableCategory.code}.${code}`, JSON.parse(schemaData.data as string));
        } catch (e) {
          LOGS.error(`JSON.parse error: ${e}`, { context: CatalogueService.name });
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
