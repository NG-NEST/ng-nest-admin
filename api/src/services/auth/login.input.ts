import { ValidatorDescription } from '@api/core';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { LoginDescription } from './auth.enum';

@InputType()
export class LoginInput {
  @Field({ description: LoginDescription.Account })
  @IsNotEmpty({ message: `${LoginDescription.Account}${ValidatorDescription.NotEmpty}` })
  account: string;

  @Field({ description: LoginDescription.Password })
  @IsNotEmpty({ message: `${LoginDescription.Password}${ValidatorDescription.NotEmpty}` })
  password: string;
}
