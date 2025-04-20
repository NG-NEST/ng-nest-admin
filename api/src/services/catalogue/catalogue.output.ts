import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Catalogue } from './catalogue.model';

@ObjectType()
export class CataloguePaginationOutput extends BasePaginationOutput(Catalogue) {}
