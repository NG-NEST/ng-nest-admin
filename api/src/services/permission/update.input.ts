import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { PermissionDescription, PERMISSION_I18N } from './permission.enum';

@InputType()
export class PermissionUpdateInput {
  @Field(() => ID, { description: PermissionDescription.Id })
  @IsNotEmpty({
    message: I18N(
      `${PERMISSION_I18N}.${PermissionDescription.Id}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  id: string;

  @Field({ description: PermissionDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(
      `${PERMISSION_I18N}.${PermissionDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  name?: string;

  @Field({ description: PermissionDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${PERMISSION_I18N}.${PermissionDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field({ description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(
      `${PERMISSION_I18N}.${PermissionDescription.Sort}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsNumber(
    {},
    {
      message: I18N(
        `${PERMISSION_I18N}.${PermissionDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort?: number;

  @Field({ description: PermissionDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
