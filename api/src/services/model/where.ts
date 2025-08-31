import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, StringFilter } from '@api/core';
import { ModelDescription } from './model.enum';

@InputType()
export class ModelWhere {
    
  @Field(() => BASE_STRING_FILTER, { description: ModelDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: ModelDescription.Type, nullable: true })
  @IsOptional()
  type?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: ModelDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;

}

@InputType()
export class ModelWhereInput extends BaseWhereInput(ModelWhere) {}
