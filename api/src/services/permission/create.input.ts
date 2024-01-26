import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription } from '@api/core';
import { PermissionDescription } from './permission.enum';
import { ResourceDescription } from '../resource';

@InputType()
export class CreatePermissionInput {
  @Field({ description: PermissionDescription.Name })
  @IsNotEmpty({ message: `${PermissionDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('permission', {
    message: `${PermissionDescription.Name}${ValidatorDescription.IsExist}`
  })
  name: string;

  @Field({ description: PermissionDescription.Code })
  @IsNotEmpty({ message: `${PermissionDescription.Code}${ValidatorDescription.NotEmpty}` })
  @IsExist('permission', {
    message: `${PermissionDescription.Code}${ValidatorDescription.IsExist}`
  })
  code: string;

  @Field({ description: PermissionDescription.Sort })
  @IsNotEmpty({ message: `${PermissionDescription.Sort}${ValidatorDescription.NotEmpty}` })
  sort: number;

  @Field({ description: PermissionDescription.Description })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id })
  @IsNotEmpty({ message: `${ResourceDescription.Id}${ValidatorDescription.NotEmpty}` })
  @IsNotExist('resource', {
    message: `${ResourceDescription.Id}${ValidatorDescription.IsNotExist}`,
    context: { relation: 'id' }
  })
  resourceId: string;
}
