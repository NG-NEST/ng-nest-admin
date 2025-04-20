import { ArgsType } from '@nestjs/graphql';
import { CatalogueWhereInput } from './where';
import { CatalogueOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class CatalogueSelectInput extends BaseSelectInput(
  CatalogueWhereInput,
  CatalogueOrderInput,
) {}
