import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Prompt } from './prompt.model';

@ObjectType()
export class PromptPaginationOutput extends BasePaginationOutput(Prompt) {}
