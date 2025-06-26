import { ID } from '@nestjs/graphql';
export const CATALOGUE_I18N = 'catalogue';

export enum CatalogueAuth {
  CatalogueCreate = 'catalogue-create',
  CatalogueUpdate = 'catalogue-update',
  CatalogueDelete = 'catalogue-delete',
  CatalogueContent = 'catalogue-content',
  CataloguePreview = 'catalogue-preview',
  CatalogueDownload = 'catalogue-download',
  CatalogueCategoryPreview = 'catalogue-category-preview',
  CatalogueCategoryDownload = 'catalogue-category-download',
  CatalogueFolderUpload = 'catalogue-folder-upload',
}

export enum CatalogueDescription {
  Catalogue = 'Catalogue',

  Id = 'CatalogueId',
  Pid = 'Pid',
  Name = 'Name',
  Type = 'Type',
  Many = 'Many',
  FileType = 'FileType',
  Sort = 'Sort',
  Description = 'Description',
  Content = 'Content',
  Url = 'Url',

  Parent = 'Parent',
  Children = 'Children',
}

export enum CatalogueResolverName {
  Catalogue = 'Catalogue',
  Catalogues = 'Catalogues',
  CatalogueSelect = 'CatalogueSelect. No Pagination',
  CreateCatalogue = 'CreateCatalogue',
  UpdateCatalogue = 'UpdateCatalogue',
  DeleteCatalogue = 'DeleteCatalogue',
}

export enum CatalogueType {
  Folder = 'Folder',
  File = 'File',
}

export enum CatalogueFileType {
  Text = 'Text',
  Media = 'Media',
  UnKnown = 'UnKnown',
}

export enum CatalogueCache {
  Catalogue = 'Catalogue',
  Catalogues = 'Catalogues',
  CatalogueSelect = 'CatalogueSelect',
}

export enum CatalogueException {
  ContentIsNull = 'content is null',
  FilesIsNull = 'files is null',
  NoCategorySelected = 'no category selected',
}

export const CatalogueCacheClear = Object.keys(CatalogueCache);

export const CatalogueId = { type: () => ID, description: CatalogueDescription.Id };
