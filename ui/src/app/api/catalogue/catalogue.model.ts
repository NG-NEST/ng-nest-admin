import { BaseModel } from '@ui/core';
import { CatalogueType } from './catalogue.enum';
import { Variable } from '../variable/variable.model';
import { Resource } from '../resource/resource.model';

export class Catalogue extends BaseModel {
  pid?: string;
  name!: string;
  type!: CatalogueType;
  many?: boolean;
  sort!: number;
  description?: string;
  content?: string;
  resource!: CatalogueResource;
  resourceId!: string;
  parent?: Catalogue;
  parentName?: string;
  variableId?: string;
  variable?: CatalogueVariable;
}

export class CatalogueResource extends Resource {}

export class CatalogueVariable extends Variable {}
