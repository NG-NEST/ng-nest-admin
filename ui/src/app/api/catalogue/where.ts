import { BaseWhereInput, BooleanFilter, EnumFilter, NumberFilter, StringFilter } from '@ui/core';
import { CatalogueType } from './catalogue.enum';
import { ResourceWhereInput } from '../resource/where';
import { VariableWhereInput } from '../variable/where';

export class CatalogueWhereInput extends BaseWhereInput<CatalogueWhereInput> {
  name?: string | StringFilter;
  type?: string | EnumFilter<CatalogueType>;
  fileType?: string | StringFilter;
  many?: boolean | BooleanFilter;
  sort?: number | NumberFilter;
  description?: string | StringFilter;
  pid?: string | StringFilter;
  resourceId?: string | StringFilter;
  resource?: ResourceWhereInput;
  variableId?: string | StringFilter;
  variable?: VariableWhereInput;
}
