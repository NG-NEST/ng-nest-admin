import { CacheClear, UploadBody, UploadFormData } from '@api/core';
import {
  CatalogueCreateInput,
  Authorization,
  CatalogueAuth,
  CatalogueService,
  CatalogueUpdateInput,
  CatalogueCacheClear,
} from '@api/services';
import { MultipartFile } from '@fastify/multipart';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { isArray, isString } from 'lodash-es';

@Controller('catalogue')
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @Patch()
  @Authorization(CatalogueAuth.CatalogueUpdate)
  @CacheClear(...CatalogueCacheClear)
  async update(@Body() data: CatalogueUpdateInput) {
    return await this.catalogueService.update(data);
  }

  @Post()
  @Authorization(CatalogueAuth.CatalogueCreate)
  @CacheClear(...CatalogueCacheClear)
  async create(@Body() data: CatalogueCreateInput) {
    return await this.catalogueService.create(data);
  }

  @Delete(':id')
  @Authorization(CatalogueAuth.CatalogueDelete)
  @CacheClear(...CatalogueCacheClear)
  async delete(@Param('id') id: string) {
    return await this.catalogueService.delete(id);
  }

  @Get('preview/:id')
  @Authorization(CatalogueAuth.CataloguePreview)
  async preview(
    @Param('id') id: string,
    @Query('schemaDataIds') schemaDataIds?: string[] | string,
  ) {
    return await this.catalogueService.preview(
      id,
      isString(schemaDataIds) ? [schemaDataIds] : schemaDataIds,
    );
  }

  @Get('download/:id')
  @Authorization(CatalogueAuth.CatalogueDownload)
  async download(
    @Param('id') id: string,
    @Res() reply: FastifyReply,
    @Query('schemaDataIds') schemaDataIds?: string[] | string,
  ) {
    const catalogue = await this.catalogueService.preview(
      id,
      isString(schemaDataIds) ? [schemaDataIds] : schemaDataIds,
    );
    if (isArray(catalogue)) {
      await this.catalogueService.downloadZip(catalogue, reply, `${new Date().getTime()}`);
    } else {
      const { name, content } = catalogue;
      reply.header('Content-Disposition', `attachment; filename=${encodeURIComponent(name)}`);
      reply.header('Content-Type', 'application/octet-stream');
      reply.send(content);
    }
  }

  @Get('category-preview/:resourceId')
  @Authorization(CatalogueAuth.CatalogueCategoryPreview)
  async categoryPreview(
    @Param('resourceId') resourceId: string,
    @Query('schemaDataIds') schemaDataIds?: string[] | string,
  ) {
    return await this.catalogueService.categoryPreview(
      resourceId,
      isString(schemaDataIds) ? [schemaDataIds] : schemaDataIds,
    );
  }

  @Get('category-download/:resourceId')
  @Authorization(CatalogueAuth.CatalogueCategoryDownload)
  async categoryDownload(
    @Param('resourceId') resourceId: string,
    @Res({ passthrough: true }) reply: FastifyReply,
    @Query('schemaDataIds') schemaDataIds?: string[] | string,
  ) {
    await this.catalogueService.categoryDownload(
      resourceId,
      reply,
      isString(schemaDataIds) ? [schemaDataIds] : schemaDataIds,
    );
  }

  @Post('folder-upload')
  @Authorization(CatalogueAuth.CatalogueFolderUpload)
  @CacheClear(...CatalogueCacheClear)
  async folderUpload(
    @UploadFormData('files') files: MultipartFile[],
    @UploadBody() body: { filepath: string; resourceId: string },
  ): Promise<any> {
    return await this.catalogueService.folderUpload(files, body);
  }
}
