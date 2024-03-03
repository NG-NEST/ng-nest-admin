import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, i18n } from '@api/core';
import { PermissionDescription, PermissionI18n } from './permission.enum';
import { ResourceDescription } from '../resource';

@InputType()
export class CreatePermissionInput {
  @Field({ description: PermissionDescription.Name })
  @IsNotEmpty({
    message: i18n(
      `${PermissionI18n}.${PermissionDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('permission', {
    message: i18n(`${PermissionI18n}.${PermissionDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: PermissionDescription.Code })
  @IsNotEmpty({
    message: i18n(
      `${PermissionI18n}.${PermissionDescription.Code}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('permission', {
    message: i18n(`${PermissionI18n}.${PermissionDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field({ description: PermissionDescription.Sort })
  @IsNotEmpty({
    message: i18n(
      `${PermissionI18n}.${PermissionDescription.Sort}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsNumber(
    {},
    {
      message: i18n(
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
    message: i18n(`${PermissionI18n}.${ResourceDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('resource', {
    message: i18n(`${PermissionI18n}.${ResourceDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  resourceId: string;
}
