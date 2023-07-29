import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDescription } from './user.enum';
import { ValidatorDescription } from '@api/core';

@InputType()
export class CreateUserInput {
  @Field({ description: UserDescription.Name })
  @IsNotEmpty({ message: `${UserDescription.Name}${ValidatorDescription.NotEmpty}` })
  name: string;

  @Field({ description: UserDescription.Account })
  @IsNotEmpty({ message: `${UserDescription.Account}${ValidatorDescription.NotEmpty}` })
  account: string;

  @Field({ description: UserDescription.Password })
  @IsNotEmpty({ message: `${UserDescription.Password}${ValidatorDescription.NotEmpty}` })
  password: string;

  @Field({ description: UserDescription.Email })
  @IsNotEmpty({ message: `${UserDescription.Email}${ValidatorDescription.NotEmpty}` })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: string;
}
