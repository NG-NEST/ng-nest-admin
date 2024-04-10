import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { RoleDescription } from '../role';
import { UserDescription, USER_I18N } from './user.enum';

@InputType()
export class UserCreateInput {
  @Field({ description: UserDescription.Name })
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('user', {
    message: I18N(`${USER_I18N}.${UserDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: UserDescription.Account })
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Account}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('user', {
    message: I18N(`${USER_I18N}.${UserDescription.Account}${ValidatorDescription.IsExist}`),
  })
  account: string;

  @Field({ description: UserDescription.Password })
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Password}${ValidatorDescription.IsNotEmpty}`),
  })
  password: string;

  @Field({ description: UserDescription.Email })
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Email}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('user', {
    message: I18N(`${USER_I18N}.${UserDescription.Email}${ValidatorDescription.IsExist}`),
  })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  @IsExist('user', {
    message: I18N(`${USER_I18N}.${UserDescription.Phone}${ValidatorDescription.IsExist}`),
  })
  phone?: string;

  @Field(() => [ID], { description: RoleDescription.Role })
  @IsOptional()
  roleIds?: string[];
}
