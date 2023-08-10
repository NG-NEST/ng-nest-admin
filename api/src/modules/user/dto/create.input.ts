import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDescription } from './user.enum';
import { BaseCreateWithoutInput, ValidatorDescription } from '@api/core';
import { CreateWithoutRoleInput, RoleDescription } from 'src/modules/role';

@InputType()
export class CreateRole {
  @Field(() => CreateWithoutRoleInput, { description: RoleDescription.Role })
  role: CreateWithoutRoleInput;
}

@InputType()
export class CreateUserRole extends BaseCreateWithoutInput(CreateRole) {}

@InputType()
export class CreateUserInput {
  @Field({ description: UserDescription.Name })
  @IsNotEmpty({ message: `${UserDescription.Name}${ValidatorDescription.NotEmpty}` })
  name: string;

  @Field({ description: UserDescription.Account })
  @IsNotEmpty({ message: `${UserDescription.Account}${ValidatorDescription.NotEmpty}` })
  account: string;

  @Field({ description: UserDescription.Password })
  @IsNotEmpty({ message: `${UserDescription.Password}${ValidatorDescription.NotEmpty}` })
  password: string;

  @Field({ description: UserDescription.Email })
  @IsNotEmpty({ message: `${UserDescription.Email}${ValidatorDescription.NotEmpty}` })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => CreateUserRole, { description: RoleDescription.Role })
  @IsOptional()
  roles?: CreateUserRole;
}
