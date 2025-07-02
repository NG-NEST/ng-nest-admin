import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { VariableCategoryDescription, VARIABLE_CATEGORY_I18N } from './variable-category.enum';

@InputType()
export class VariableCategoryUpdateInput {
  @Field(() => ID, { description: VariableCategoryDescription.Id })
  @IsNotEmpty({
    message: I18N(
      `${VARIABLE_CATEGORY_I18N}.${VariableCategoryDescription.Id}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  id: string;

  @Field({ description: VariableCategoryDescription.Name, nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { description: VariableCategoryDescription.Code, nullable: true })
  @IsOptional()
  code?: string;

  @Field({ description: VariableCategoryDescription.Sort, nullable: true })
  @IsOptional()
  sort?: number;

  @Field({ description: VariableCategoryDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
