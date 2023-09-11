import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { RoleDescription } from '../enum';
import { ValidatorDescription } from '@api/core';

@InputType()
export class CreateRoleInput {
  @Field({ description: RoleDescription.Name })
  @IsNotEmpty({ message: `${RoleDescription.Name}${ValidatorDescription.NotEmpty}` })
  name: string;

  @Field({ description: RoleDescription.Code })
  @IsNotEmpty({ message: `${RoleDescription.Code}${ValidatorDescription.NotEmpty}` })
  code: string;
}

@InputType()
export class CreateWithoutRoleInput {
  @Field(() => CreateRoleInput)
  create: CreateRoleInput;
}
