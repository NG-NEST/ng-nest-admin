import { BaseSelectInput } from '@ui/core';
import { CatalogueWhereInput } from './where';
import { CatalogueOrderInput } from './order';

export class CatalogueSelectInput extends BaseSelectInput(
  CatalogueWhereInput,
  CatalogueOrderInput
) {}
