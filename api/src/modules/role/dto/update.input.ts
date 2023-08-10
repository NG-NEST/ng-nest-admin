import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RoleDescription } from './role.enum';
import { ValidatorDescription } from '@api/core';

@InputType()
export class UpdateRoleInput {
  @Field({ description: RoleDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${RoleDescription.Name}${ValidatorDescription.NotEmpty}` })
  name?: string;

  @Field({ description: RoleDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${RoleDescription.Code}${ValidatorDescription.NotEmpty}` })
  code?: string;
}
