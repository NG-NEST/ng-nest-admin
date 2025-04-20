import { BasePaginationInput } from '@ui/core';
import { CatalogueWhereInput } from './where';
import { CatalogueOrderInput } from './order';

export class CataloguePaginationInput extends BasePaginationInput(
  CatalogueWhereInput,
  CatalogueOrderInput
) {}
