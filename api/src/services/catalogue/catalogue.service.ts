import { BaseSelect, PrismaService } from '@api/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CataloguePaginationInput } from './pagination.input';
import { Catalogue } from './catalogue.model';
import { CatalogueUpdateInput } from './update.input';
import { CatalogueCreateInput } from './create.input';
import { CatalogueSelectInput } from './select.input';
import { CataloguePaginationOutput } from './catalogue.output';
import Handlebars from 'handlebars';
import { CatalogueException, CatalogueType } from './catalogue.enum';
import { FastifyRequest } from 'fastify';
import { UploadInput, UploadService } from '../upload';
import { File } from '../file';
import { MultipartFile } from '@fastify/multipart';
import { v4 } from 'uuid';

@Injectable()
export class CatalogueService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  RESOURCE_FILE_TYPE = 'file-type';
  RESOURCE_MEDIA_TYPE = 'media-type';
  RESOURCE_TEXT_TYPE = 'text-type';

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
    const { resourceId, pid, ...other } = input;
    const data = { ...other, resource: { connect: { id: resourceId } }, parent: {} };
    if (pid) {
      data.parent = { connect: { id: pid } };
    }
    return await this.prisma.catalogue.create({
      data,
    });
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
    const template = Handlebars.compile(catalogue.content);
    const ctx = template({ title: 'xxxx' });
    return ctx;
  }

  async folderUpload(req: FastifyRequest) {
    const body: UploadInput = { filepath: 'catalogue-folder' };
    const files: MultipartFile[] = [];

    let resourceId = '';
    for await (const part of req.parts()) {
      if (part.type === 'file') {
        files.push(part);
      } else {
        if (part.fieldname === 'filepath') {
          body.filepath = part.value as string;
        }
        if (part.fieldname === 'resourceId') {
          resourceId = part.value as string;
        }
      }
    }

    if (files.length === 0) {
      throw new BadRequestException({ message: CatalogueException.FilesIsNull });
    }

    const { mediaTypes, textTypes } = await this.getFileTypes();

    const results: any[] = await Promise.all(
      files.map(async (file) => {
        const ext = this.getFileExtension(file.filename);
        if (mediaTypes.includes(ext)) {
          return await this.uploadService.uploadCosFastify(file, body);
        } else if (textTypes.includes(ext)) {
          return await this.getFileText(file);
        } else {
          return await this.getFileText(file);
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

    const mediaFile = fileTypes.find((x) => x.code === this.RESOURCE_MEDIA_TYPE);
    const textFile = fileTypes.find((x) => x.code === this.RESOURCE_TEXT_TYPE);

    return {
      mediaTypes: mediaFile?.children.map((x) => x.code),
      textTypes: textFile?.children.map((x) => x.code),
    };
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
}
