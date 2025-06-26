import { CatalogueType } from './catalogue.enum';

export class CatalogueCreateInput {
  name!: string;
  type!: CatalogueType;
  sort!: number;
  many?: boolean;
  description?: string;
  resourceId!: string;
  variableId?: string;
  pid?: string;
}
