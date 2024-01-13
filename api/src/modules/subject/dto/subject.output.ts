import { ObjectType } from '@nestjs/graphql';
import { Subject } from '../model';
import { BasePaginationOutput } from '@api/core';

@ObjectType()
export class SubjectPaginationOutput extends BasePaginationOutput(Subject) {}
