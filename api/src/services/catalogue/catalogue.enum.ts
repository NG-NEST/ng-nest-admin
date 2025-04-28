import { ID } from '@nestjs/graphql';
export const CATALOGUE_I18N = 'catalogue';

export enum CatalogueAuth {
  CatalogueCreate = 'catalogue-create',
  CatalogueUpdate = 'catalogue-update',
  CatalogueDelete = 'catalogue-delete',
}

export enum CatalogueDescription {
  Catalogue = 'Catalogue',

  Id = 'CatalogueId',
  Pid = 'Pid',
  Name = 'Name',
  Type = 'Type',
  Sort = 'Sort',
  Description = 'Description',
  Content = 'Content',

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

export enum CatalogueCache {
  Catalogue = 'Catalogue',
  Catalogues = 'Catalogues',
  CatalogueSelect = 'CatalogueSelect',
}

export const CatalogueCacheClear = Object.keys(CatalogueCache);

export const CatalogueId = { type: () => ID, description: CatalogueDescription.Id };
