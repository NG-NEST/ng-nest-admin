import { CatalogueType } from './catalogue.enum';

export class CatalogueUpdateInput {
  id!: string;
  name?: string;
  type?: CatalogueType;
  sort?: number;
  many?: boolean;
  description?: string;
  content?: string;
  resourceId?: string;
  variableId?: string;
  pid?: string;
}
