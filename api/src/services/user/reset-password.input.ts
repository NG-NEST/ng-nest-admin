import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { UserDescription, USER_I18N } from './user.enum';

@InputType()
export class UserResetPasswordInput {
  @Field({ description: UserDescription.Password })
  @IsNotEmpty({
    message: I18N(`${USER_I18N}.${UserDescription.Password}${ValidatorDescription.IsNotEmpty}`),
  })
  password: string;
}
