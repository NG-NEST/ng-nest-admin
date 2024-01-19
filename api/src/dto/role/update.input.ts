import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription } from '@api/core';
import { RoleDescription } from './role.enum';

@InputType()
export class UpdateRoleInput {
  @Field(() => ID, { description: RoleDescription.Id })
  @IsNotEmpty({ message: `${RoleDescription.Id}${ValidatorDescription.NotEmpty}` })
  id: string;

  @Field({ description: RoleDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${RoleDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('role', { message: `${RoleDescription.Name}${ValidatorDescription.IsExist}` })
  name?: string;

  @Field({ description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
