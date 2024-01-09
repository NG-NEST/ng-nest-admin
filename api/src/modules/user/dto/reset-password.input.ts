import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { UserDescription } from '../enum';
import { ValidatorDescription } from '@api/core';

@InputType()
export class ResetPasswordInput {
  @Field({ description: UserDescription.Password })
  @IsNotEmpty({ message: `${UserDescription.Password}${ValidatorDescription.NotEmpty}` })
  password: string;
}
