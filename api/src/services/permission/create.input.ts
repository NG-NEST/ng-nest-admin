import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { PermissionDescription, PERMISSION_I18N } from './permission.enum';
import { ResourceDescription } from '../resource';

@InputType()
export class PermissionCreateInput {
  @Field({ description: PermissionDescription.Name })
  @IsNotEmpty({
    message: I18N(
      `${PERMISSION_I18N}.${PermissionDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('permission', {
    message: I18N(`${PERMISSION_I18N}.${PermissionDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: PermissionDescription.Code })
  @IsNotEmpty({
    message: I18N(
      `${PERMISSION_I18N}.${PermissionDescription.Code}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('permission', {
    message: I18N(`${PERMISSION_I18N}.${PermissionDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field({ description: PermissionDescription.Sort })
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
  sort: number;

  @Field({ description: PermissionDescription.Description })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id })
  @IsNotEmpty({
    message: I18N(`${PERMISSION_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('resource', {
    message: I18N(`${PERMISSION_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  resourceId: string;
}
