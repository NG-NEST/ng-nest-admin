import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BaseStringFilter, BaseWhereInput, NumberFilter, StringFilter } from '@api/core';
import { DictionaryDescription } from './dictionary.enum';

@InputType()
export class DictionaryWhere {
  @Field(() => BaseStringFilter, { description: DictionaryDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: DictionaryDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BaseStringFilter, { description: DictionaryDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BaseStringFilter, { description: DictionaryDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BaseStringFilter, { description: DictionaryDescription.Pid, nullable: true })
  @IsOptional()
  pid?: StringFilter;
}

@InputType()
export class DictionaryWhereInput extends BaseWhereInput(DictionaryWhere) {}
