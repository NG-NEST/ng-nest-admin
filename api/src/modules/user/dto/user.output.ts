import { ObjectType } from '@nestjs/graphql';
import { User } from '../model';
import { BasePaginationOutput } from '@api/core';

@ObjectType()
export class UserPaginationOutput extends BasePaginationOutput(User) {}
