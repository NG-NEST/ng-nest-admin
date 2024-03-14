import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { RoleDescription, RoleI18n } from './role.enum';

@InputType()
export class RoleCreateInput {
  @Field({ description: RoleDescription.Name })
  @IsNotEmpty({
    message: i18n(`${RoleI18n}.${RoleDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('role', {
    message: i18n(`${RoleI18n}.${RoleDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: RoleDescription.Description })
  @IsOptional()
  description?: string;
}
