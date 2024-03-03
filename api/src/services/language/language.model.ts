import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { LanguageDescription } from './language.enum';

@ObjectType()
export class Language extends BaseAudit {
  @Field(() => ID, { description: LanguageDescription.Id })
  id: string;

  @Field({ description: LanguageDescription.Key })
  key: string;

  @Field({ description: LanguageDescription.Value })
  @IsOptional()
  value?: string;

  @Field({ description: LanguageDescription.LanguageCode })
  languageCode: string;
}
