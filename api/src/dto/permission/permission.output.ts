import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Permission } from './permission.model';

@ObjectType()
export class PermissionPaginationOutput extends BasePaginationOutput(Permission) {}
