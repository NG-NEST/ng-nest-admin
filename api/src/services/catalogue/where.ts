import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BASE_BOOLEAN_FILTER,
  BASE_NUMBER_FILTER,
  BASE_STRING_FILTER,
  BaseWhereInput,
  BooleanFilter,
  EnumFilter,
  NumberFilter,
  StringFilter,
} from '@api/core';
import { CatalogueDescription } from './catalogue.enum';
import { ResourceDescription, ResourceWhereInput } from '../resource';
import { CatalogueType } from '@prisma/client';
import { VariableDescription, VariableWhereInput } from '../variable';

@InputType()
export class CatalogueWhere {
  @Field(() => BASE_STRING_FILTER, { description: CatalogueDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: CatalogueDescription.Type, nullable: true })
  @IsOptional()
  type?: EnumFilter<CatalogueType>;

  @Field(() => BASE_NUMBER_FILTER, { description: CatalogueDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BASE_BOOLEAN_FILTER, { description: CatalogueDescription.Many, nullable: true })
  @IsOptional()
  many?: BooleanFilter;

  @Field(() => BASE_STRING_FILTER, { description: CatalogueDescription.FileType, nullable: true })
  @IsOptional()
  fileType?: StringFilter;

  @Field(() => BASE_STRING_FILTER, {
    description: CatalogueDescription.Description,
    nullable: true,
  })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BASE_STRING_FILTER, {
    description: CatalogueDescription.Content,
    nullable: true,
  })
  @IsOptional()
  content?: StringFilter;

  @Field(() => BASE_STRING_FILTER, {
    description: CatalogueDescription.Url,
    nullable: true,
  })
  @IsOptional()
  url?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: CatalogueDescription.Pid, nullable: true })
  @IsOptional()
  pid?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Id, nullable: true })
  @IsOptional()
  resourceId?: StringFilter;

  @Field(() => ResourceWhereInput, { description: ResourceDescription.Resource, nullable: true })
  @IsOptional()
  resource?: ResourceWhereInput;

  @Field({ description: VariableDescription.Id, nullable: true })
  @IsOptional()
  variableId?: StringFilter;

  @Field(() => VariableWhereInput, { description: VariableDescription.Variable, nullable: true })
  @IsOptional()
  variable?: VariableWhereInput;
}

@InputType()
export class CatalogueWhereInput extends BaseWhereInput(CatalogueWhere) {}
