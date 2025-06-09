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
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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

  @Get('content/:id')
  @Authorization(CatalogueAuth.CatalogueContent)
  async content(@Param('id') id: string) {
    return await this.catalogueService.content(id);
  }

  @Get('preview/:id')
  @Authorization(CatalogueAuth.CataloguePreview)
  async preview(@Param('id') id: string) {
    return await this.catalogueService.preview(id);
  }

  @Get('category-preview/:resourceId')
  @Authorization(CatalogueAuth.CatalogueCategoryPreview)
  async categoryPreview(@Param('resourceId') resourceId: string) {
    return await this.catalogueService.categoryPreview(resourceId);
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
