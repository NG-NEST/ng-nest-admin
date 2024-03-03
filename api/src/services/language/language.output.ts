import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Language } from './language.model';

@ObjectType()
export class LanguagePaginationOutput extends BasePaginationOutput(Language) {}
