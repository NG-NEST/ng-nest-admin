import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { AuthI18n, LoginDescription } from './auth.enum';
import { i18nValidationMessage as M } from 'nestjs-i18n';
import { ValidatorDescription } from '@api/core';

@InputType()
export class LoginInput {
  @Field({ description: LoginDescription.Account })
  @IsNotEmpty({
    message: M(`${AuthI18n}.${LoginDescription.Account}${ValidatorDescription.NotEmpty}`),
  })
  account: string;

  @Field({ description: LoginDescription.Password })
  @IsNotEmpty({
    message: M(`${AuthI18n}.${LoginDescription.Password}${ValidatorDescription.NotEmpty}`),
  })
  password: string;
}
