import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthI18n, LoginDescription } from './auth.enum';
import { ValidatorDescription, i18n } from '@api/core';

@InputType()
export class LoginInput {
  @Field({ description: LoginDescription.Account })
  @IsNotEmpty({
    message: i18n(`${AuthI18n}.${LoginDescription.Account}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsString({
    message: i18n(`${AuthI18n}.${LoginDescription.Account}${ValidatorDescription.IsString}`),
  })
  account: string;

  @Field({ description: LoginDescription.Password })
  @IsNotEmpty({
    message: i18n(`${AuthI18n}.${LoginDescription.Password}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsString({
    message: i18n(`${AuthI18n}.${LoginDescription.Password}${ValidatorDescription.IsString}`),
  })
  password: string;
}
