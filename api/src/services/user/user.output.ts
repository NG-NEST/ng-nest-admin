import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { User } from './user.model';

@ObjectType()
export class UserPaginationOutput extends BasePaginationOutput(User) {}
