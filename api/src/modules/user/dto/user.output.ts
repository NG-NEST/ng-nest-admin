import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { BasePaginationOutput } from '@api/core';

@ObjectType()
export class UserPaginationOutput extends BasePaginationOutput(User) {}
