import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { RoleDescription, ROLE_I18N } from './role.enum';

@InputType()
export class RoleUpdateInput {
  @Field(() => ID, { description: RoleDescription.Id })
  @IsNotEmpty({
    message: I18N(`${ROLE_I18N}.${RoleDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: RoleDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${ROLE_I18N}.${RoleDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('role', {
    message: I18N(`${ROLE_I18N}.${RoleDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
