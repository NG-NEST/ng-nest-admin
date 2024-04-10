import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { AUTH_I18N, LoginDescription } from './auth.enum';
import { ValidatorDescription, I18N } from '@api/core';

@InputType()
export class LoginInput {
  @Field({ description: LoginDescription.Account })
  @IsNotEmpty({
    message: I18N(`${AUTH_I18N}.${LoginDescription.Account}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsString({
    message: I18N(`${AUTH_I18N}.${LoginDescription.Account}${ValidatorDescription.IsString}`),
  })
  account: string;

  @Field({ description: LoginDescription.Password })
  @IsNotEmpty({
    message: I18N(`${AUTH_I18N}.${LoginDescription.Password}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsString({
    message: I18N(`${AUTH_I18N}.${LoginDescription.Password}${ValidatorDescription.IsString}`),
  })
  password: string;

  @Field({ description: LoginDescription.Code })
  @IsNotEmpty({
    message: I18N(`${AUTH_I18N}.${LoginDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsString({
    message: I18N(`${AUTH_I18N}.${LoginDescription.Code}${ValidatorDescription.IsString}`),
  })
  code: string;
}
