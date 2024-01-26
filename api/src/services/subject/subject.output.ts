import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Subject } from './subject.model';

@ObjectType()
export class SubjectPaginationOutput extends BasePaginationOutput(Subject) {}
