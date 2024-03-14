import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { RoleDescription, RoleI18n } from './role.enum';

@InputType()
export class RoleUpdateInput {
  @Field(() => ID, { description: RoleDescription.Id })
  @IsNotEmpty({
    message: i18n(`${RoleI18n}.${RoleDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: RoleDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${RoleI18n}.${RoleDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('role', {
    message: i18n(`${RoleI18n}.${RoleDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
