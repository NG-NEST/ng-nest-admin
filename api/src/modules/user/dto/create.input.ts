import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDescription } from '../enum';
import { IsExist, ValidatorDescription } from '@api/core';
import { RoleDescription } from '../../role';

@InputType()
export class CreateUserInput {
  @Field({ description: UserDescription.Name })
  @IsNotEmpty({ message: `${UserDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('user', { message: `${UserDescription.Name}${ValidatorDescription.IsExist}` })
  name: string;

  @Field({ description: UserDescription.Account })
  @IsNotEmpty({ message: `${UserDescription.Account}${ValidatorDescription.NotEmpty}` })
  @IsExist('user', { message: `${UserDescription.Account}${ValidatorDescription.IsExist}` })
  account: string;

  @Field({ description: UserDescription.Password })
  @IsNotEmpty({ message: `${UserDescription.Password}${ValidatorDescription.NotEmpty}` })
  password: string;

  @Field({ description: UserDescription.Email })
  @IsNotEmpty({ message: `${UserDescription.Email}${ValidatorDescription.NotEmpty}` })
  @IsExist('user', { message: `${UserDescription.Email}${ValidatorDescription.IsExist}` })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  @IsExist('user', { message: `${UserDescription.Phone}${ValidatorDescription.IsExist}` })
  phone?: string;

  @Field(() => [ID], { description: RoleDescription.Role })
  @IsOptional()
  roleIds?: string[];
}
