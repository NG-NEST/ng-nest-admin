import { ValidatorDescription } from '@api/core';
import { UserDescription } from '@api/modules';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field({ description: UserDescription.Account })
  @IsNotEmpty({ message: `${UserDescription.Account}${ValidatorDescription.NotEmpty}` })
  account: string;

  @Field({ description: UserDescription.Password })
  @IsNotEmpty({ message: `${UserDescription.Password}${ValidatorDescription.NotEmpty}` })
  password: string;
}
