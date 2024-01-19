import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Resource } from './resource.model';

@ObjectType()
export class ResourcePaginationOutput extends BasePaginationOutput(Resource) {}
