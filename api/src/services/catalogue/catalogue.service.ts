import { BaseSelect, PrismaService } from '@api/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CataloguePaginationInput } from './pagination.input';
import { Catalogue } from './catalogue.model';
import { CatalogueUpdateInput } from './update.input';
import { CatalogueCreateInput } from './create.input';
import { CatalogueSelectInput } from './select.input';
import { CataloguePaginationOutput } from './catalogue.output';

import { CatalogueException, CatalogueFileType, CatalogueType } from './catalogue.enum';
import { FastifyRequest } from 'fastify';
import { UploadInput, UploadService } from '../upload';
import { File } from '../file';
import { MultipartFile } from '@fastify/multipart';
import { v4 } from 'uuid';
import { TemplateService } from '@api/core';

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
    let { resourceId, pid, fileType, ...other } = input;
    if (!fileType) {
      fileType = await this.fileType(input.name);
    }
    const data = { ...other, fileType, resource: { connect: { id: resourceId } }, parent: {} };
    if (pid) {
      data.parent = { connect: { id: pid } };
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

  async content(id: string) {
    const catalogue = (await this.prisma.catalogue.findUnique({
      where: { id },
      select: { content: true },
    })) as Catalogue;
    if (!catalogue) {
      return '';
    }
    if (catalogue.content === null) {
      throw new BadRequestException({ message: CatalogueException.ContentIsNull });
    }

    return this.templateService.generate(catalogue.content, { title: 'xxx' });
  }

  async preview(id: string) {
    const catalogue = await this.prisma.catalogue.findUnique({
      where: { id },
    });

    return catalogue;
  }

  async categoryPreview(resourceId: string) {
    const catalogues = await this.prisma.catalogue.findMany({
      where: { resourceId },
    });
    for (let catalogue of catalogues) {
      const { content } = catalogue;
      if (!content) break;

      catalogue.content = this.templateService.generate(content, {});
    }

    return catalogues;
  }

  async folderUpload(req: FastifyRequest) {
    const body: UploadInput = { filepath: 'catalogue-folder' };
    const files: any[] = [];
    const hostUrl = `${req.protocol}://${req.headers.host}`;

    const parts = req.parts();

    let resourceId = '';

    let part;
    while ((part = await parts.next())) {
      if (part.done) break;

      console.log(part.value.fieldname);

      if (part.value.type === 'file') {
        files.push(part.value);
      } else {
        const value = await part.value.value; // 获取字段值
        if (part.value.fieldname === 'filepath') {
          body.filepath = value as string;
        }
        if (part.value.fieldname === 'resourceId') {
          resourceId = value as string;
        }
      }

      console.log(files, body, resourceId);
    }

    console.log(222);

    if (!resourceId) {
      throw new BadRequestException({ message: CatalogueException.NoCategorySelected });
    }

    if (files.length === 0) {
      throw new BadRequestException({ message: CatalogueException.FilesIsNull });
    }

    const fileTypes = await this.getFileTypes();
    const { text } = fileTypes;

    const results: any[] = await Promise.all(
      files.map(async (file) => {
        const ext = this.getFileExtension(file.filename);
        if (text.includes(ext)) {
          return await this.getFileText(file);
        } else {
          return await this.uploadService.localFastify(file, body, hostUrl);
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

  private convertToCatalogueTree(files: File[], resourceId: string) {
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

  private async getFileText(file: MultipartFile): Promise<File> {
    const result: File = { name: file.filename };

    try {
      result.content = await file.toBuffer().then((x) => x.toString());
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
