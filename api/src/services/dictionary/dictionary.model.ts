import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { DictionaryDescription } from './dictionary.enum';

@ObjectType()
export class Dictionary extends BaseAudit {
  @Field(() => ID, { description: DictionaryDescription.Id })
  id: string;

  @Field(() => ID, { description: DictionaryDescription.Pid, nullable: true })
  @IsOptional()
  pid?: string;

  @Field(() => Dictionary, { description: DictionaryDescription.Parent, nullable: true })
  @IsOptional()
  parent?: Dictionary;

  @Field(() => [Dictionary], { description: DictionaryDescription.Children, nullable: true })
  @IsOptional()
  children?: Dictionary[];

  @Field({ description: DictionaryDescription.Name })
  name: string;

  @Field({ description: DictionaryDescription.Code })
  code: string;

  @Field({ description: DictionaryDescription.Sort })
  sort: number;

  @Field({ description: DictionaryDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
