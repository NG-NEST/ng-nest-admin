import { BaseSelect, PrismaService } from '@api/core';
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

  async preview(id: string) {
    const catalogue = (await this.prisma.catalogue.findUnique({
      where: { id },
      select: { content: true, resourceId: true },
    })) as Catalogue;
    if (!catalogue) {
      return null;
    }
    if (catalogue.content === null) {
      throw new BadRequestException({ message: CatalogueException.ContentIsNull });
    }

    catalogue.content = this.templateService.generate(
      catalogue.content,
      await this.getResourceVars(catalogue.resourceId),
    );

    return catalogue;
  }

  async categoryPreview(resourceId: string) {
    const catalogues = await this.prisma.catalogue.findMany({
      where: { resourceId },
    });
    for (let catalogue of catalogues) {
      const { content } = catalogue;
      if (!content) break;

      catalogue.content = this.templateService.generate(
        content,
        await this.getResourceVars(resourceId),
      );
    }

    return catalogues;
  }

  async categoryDownload(resourceId: string, reply: FastifyReply) {
    const resource = await this.prisma.resource.findUnique({ where: { id: resourceId } });

    const catalogues = await this.categoryPreview(resourceId);

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    reply.header('Content-Type', 'application/zip');
    reply.header('Content-Disposition', `attachment; filename=${resource.name}.zip`);

    archive.pipe(reply.raw);

    const buildTree = (pid: string | null): Catalogue[] => {
      return catalogues
        .filter((catalogue) => catalogue.pid === pid)
        .map(
          (catalogue) =>
            ({
              ...catalogue,
              children: buildTree(catalogue.id),
            }) as Catalogue,
        );
    };

    const rootNodes = buildTree(null);

    const addToArchive = (node: Catalogue, path = '') => {
      const currentPath = path ? `${path}/${node.name}` : node.name;
      if (node.children?.length) {
        archive.directory(null, currentPath);
        node.children.forEach((child: Catalogue) => addToArchive(child, currentPath));
      } else {
        if (node.content) {
          archive.append(node.content, { name: currentPath });
        }
      }
    };

    rootNodes.forEach((node) => addToArchive(node));

    await archive.finalize();

    return reply;
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

  private async getResourceVars(resourceId: string): Promise<{ [code: string]: any }> {
    const variables = await this.prisma.variable.findMany({
      where: { resourceId: { equals: resourceId } },
      select: { code: true, value: true, variableCategory: { select: { code: true } } },
    });

    const vars: { [code: string]: any } = {};
    for (let variable of variables) {
      const { code, value, variableCategory } = variable;
      set(vars, `${variableCategory.code}.${code}`, value);
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
