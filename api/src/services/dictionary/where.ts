import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, NumberFilter, StringFilter } from '@api/core';
import { DictionaryDescription } from './dictionary.enum';

@InputType()
export class DictionaryWhere {
  @Field(() => BASE_STRING_FILTER, { description: DictionaryDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: DictionaryDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: DictionaryDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BASE_STRING_FILTER, { description: DictionaryDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: DictionaryDescription.Pid, nullable: true })
  @IsOptional()
  pid?: StringFilter;
}

@InputType()
export class DictionaryWhereInput extends BaseWhereInput(DictionaryWhere) {}
