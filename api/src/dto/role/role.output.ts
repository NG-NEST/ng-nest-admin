import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Role } from './role.model';

@ObjectType()
export class RolePaginationOutput extends BasePaginationOutput(Role) {}
