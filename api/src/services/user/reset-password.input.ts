import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ValidatorDescription, i18n } from '@api/core';
import { UserDescription, UserI18n } from './user.enum';

@InputType()
export class ResetPasswordInput {
  @Field({ description: UserDescription.Password })
  @IsNotEmpty({
    message: i18n(`${UserI18n}.${UserDescription.Password}${ValidatorDescription.IsNotEmpty}`),
  })
  password: string;
}
