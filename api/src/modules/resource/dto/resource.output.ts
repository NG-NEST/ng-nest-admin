import { ObjectType } from '@nestjs/graphql';
import { Resource } from '../model';
import { BasePaginationOutput } from '@api/core';

@ObjectType()
export class ResourcePaginationOutput extends BasePaginationOutput(Resource) {}
