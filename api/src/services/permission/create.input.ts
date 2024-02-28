import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription } from '@api/core';
import { PermissionDescription, PermissionI18n } from './permission.enum';
import { ResourceDescription } from '../resource';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreatePermissionInput {
  @Field({ description: PermissionDescription.Name })
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Name}${ValidatorDescription.NotEmpty}`,
    ),
  })
  @IsExist('permission', {
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Name}${ValidatorDescription.IsExist}`,
    ),
  })
  name: string;

  @Field({ description: PermissionDescription.Code })
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Code}${ValidatorDescription.NotEmpty}`,
    ),
  })
  @IsExist('permission', {
    message: i18nValidationMessage(
      `${PermissionI18n}.${PermissionDescription.Code}${ValidatorDescription.IsExist}`,
    ),
  })
  code: string;

  @Field({ description: PermissionDescription.Sort })
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
  sort: number;

  @Field({ description: PermissionDescription.Description })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id })
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${PermissionI18n}.${ResourceDescription.Id}${ValidatorDescription.NotEmpty}`,
    ),
  })
  @IsNotExist('resource', {
    message: i18nValidationMessage(
      `${PermissionI18n}.${ResourceDescription.Id}${ValidatorDescription.IsNotExist}`,
    ),
    context: { relation: 'id' },
  })
  resourceId: string;
}
