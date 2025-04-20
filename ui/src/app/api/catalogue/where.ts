import { BaseWhereInput, EnumFilter, NumberFilter, StringFilter } from '@ui/core';
import { CatalogueType } from './catalogue.enum';
import { ResourceWhereInput } from '../resource/where';

export class CatalogueWhereInput extends BaseWhereInput<CatalogueWhereInput> {
  name?: string | StringFilter;
  type?: string | EnumFilter<CatalogueType>;
  sort?: number | NumberFilter;
  description?: string | StringFilter;
  pid?: string | StringFilter;
  resourceId?: string | StringFilter;
  resource?: ResourceWhereInput;
}
