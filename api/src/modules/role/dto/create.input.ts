import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RoleDescription } from '../enum';
import { IsExist, ValidatorDescription } from '@api/core';

@InputType()
export class CreateRoleInput {
  @Field({ description: RoleDescription.Name })
  @IsNotEmpty({ message: `${RoleDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('role', { message: `${RoleDescription.Name}${ValidatorDescription.IsExist}` })
  name: string;

  @Field({ description: RoleDescription.Description })
  @IsOptional()
  description?: string;
}
