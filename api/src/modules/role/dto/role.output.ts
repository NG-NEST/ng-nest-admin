import { ObjectType } from '@nestjs/graphql';
import { Role } from './role.model';
import { BasePaginationOutput } from '@api/core';

@ObjectType()
export class RolePaginationOutput extends BasePaginationOutput(Role) {}
