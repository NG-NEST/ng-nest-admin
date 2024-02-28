import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ValidatorDescription } from '@api/core';
import { PermissionDescription, PermissionI18n } from './permission.enum';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class UpdatePermissionInput {
  @Field(() => ID, { description: PermissionDescription.Id })
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Id}${ValidatorDescription.NotEmpty}`,
    ),
  })
  id: string;

  @Field({ description: PermissionDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Name}${ValidatorDescription.NotEmpty}`,
    ),
  })
  name?: string;

  @Field({ description: PermissionDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Code}${ValidatorDescription.IsExist}`,
    ),
  })
  code?: string;

  @Field({ description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Sort}${ValidatorDescription.NotEmpty}`,
    ),
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage(
        `${PermissionI18n}.${PermissionDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort?: number;

  @Field({ description: PermissionDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
