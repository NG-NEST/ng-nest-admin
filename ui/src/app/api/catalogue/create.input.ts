import { CatalogueType } from './catalogue.enum';

export class CatalogueCreateInput {
  name!: string;
  type!: CatalogueType;
  sort!: number;
  description?: string;
  resourceId!: string;
  pid?: string;
}
