import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ValidatorDescription } from '@api/core';
import { UserDescription } from './user.enum';

@InputType()
export class ResetPasswordInput {
  @Field({ description: UserDescription.Password })
  @IsNotEmpty({ message: `${UserDescription.Password}${ValidatorDescription.NotEmpty}` })
  password: string;
}
