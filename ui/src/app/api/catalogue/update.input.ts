import { CatalogueType } from './catalogue.enum';

export class CatalogueUpdateInput {
  id!: string;
  name!: string;
  type!: CatalogueType;
  sort!: number;
  description?: string;
  resourceId!: string;
  pid?: string;
}
