import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ValidatorDescription, i18n } from '@api/core';
import { PermissionDescription, PermissionI18n } from './permission.enum';

@InputType()
export class PermissionUpdateInput {
  @Field(() => ID, { description: PermissionDescription.Id })
  @IsNotEmpty({
    message: i18n(
      `${PermissionI18n}.${PermissionDescription.Id}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  id: string;

  @Field({ description: PermissionDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(
      `${PermissionI18n}.${PermissionDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  name?: string;

  @Field({ description: PermissionDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${PermissionI18n}.${PermissionDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field({ description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
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
  sort?: number;

  @Field({ description: PermissionDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
