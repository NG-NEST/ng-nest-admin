import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { RoleDescription } from '../role';
import { UserDescription, USER_I18N } from './user.enum';

@InputType()
export class UserUpdateInput {
  @Field(() => ID, { description: UserDescription.Id })
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: UserDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('user', {
    message: I18N(`${USER_I18N}.${UserDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: UserDescription.Email, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Email}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('user', {
    message: I18N(`${USER_I18N}.${UserDescription.Email}${ValidatorDescription.IsExist}`),
  })
  email?: string;

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
