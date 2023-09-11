import { ObjectType } from '@nestjs/graphql';
import { Role } from '../model';
import { BasePaginationOutput } from '@api/core';

@ObjectType()
export class RolePaginationOutput extends BasePaginationOutput(Role) {}
