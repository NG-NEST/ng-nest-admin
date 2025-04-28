import { BaseModel } from '@ui/core';
import { CatalogueType } from './catalogue.enum';

export class Catalogue extends BaseModel {
  pid?: string;
  name!: string;
  type!: CatalogueType;
  sort!: number;
  description?: string;
  content?: string;
  resource!: CatalogueResource;
  resourceId!: string;
  parent?: Catalogue;
  parentName?: string;
}

export class CatalogueResource {
  id!: string;
  name!: string;
}
