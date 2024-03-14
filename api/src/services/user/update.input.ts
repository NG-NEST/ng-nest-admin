import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { RoleDescription } from '../role';
import { UserDescription, UserI18n } from './user.enum';

@InputType()
export class UserUpdateInput {
  @Field(() => ID, { description: UserDescription.Id })
  @IsNotEmpty({
    message: i18n(`${UserI18n}.${UserDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: UserDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${UserI18n}.${UserDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('user', {
    message: i18n(`${UserI18n}.${UserDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: UserDescription.Email, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${UserI18n}.${UserDescription.Email}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('user', {
    message: i18n(`${UserI18n}.${UserDescription.Email}${ValidatorDescription.IsExist}`),
  })
  email?: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  @IsExist('user', {
    message: i18n(`${UserI18n}.${UserDescription.Phone}${ValidatorDescription.IsExist}`),
  })
  phone?: string;

  @Field(() => [ID], { description: RoleDescription.Role })
  @IsOptional()
  roleIds?: string[];
}
