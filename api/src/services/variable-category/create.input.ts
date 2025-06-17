import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { VariableCategoryDescription, VARIABLE_CATEGORY_I18N } from './variable-category.enum';
import { ResourceDescription } from '../resource';

@InputType()
export class VariableCategoryCreateInput {
  @Field({ description: VariableCategoryDescription.Name })
  @IsNotEmpty({
    message: I18N(
      `${VARIABLE_CATEGORY_I18N}.${VariableCategoryDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  name: string;

  @Field({ description: VariableCategoryDescription.Code })
  @IsNotEmpty({
    message: I18N(
      `${VARIABLE_CATEGORY_I18N}.${VariableCategoryDescription.Code}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  code: string;

  @Field({ description: VariableCategoryDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id })
  @IsNotEmpty({
    message: I18N(`${VARIABLE_CATEGORY_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('resource', {
    message: I18N(`${VARIABLE_CATEGORY_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  resourceId: string;
}
