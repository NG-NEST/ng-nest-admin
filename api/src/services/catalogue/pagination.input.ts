import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { CatalogueWhereInput } from './where';
import { CatalogueOrderInput } from './order';

@ArgsType()
export class CataloguePaginationInput extends BasePaginationInput(
  CatalogueWhereInput,
  CatalogueOrderInput
) {}
