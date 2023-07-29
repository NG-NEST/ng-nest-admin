import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDescription } from './user.enum';
import { ValidatorDescription } from '@api/core';

@InputType()
export class UpdateUserInput {
  @Field({ description: UserDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${UserDescription.Name}${ValidatorDescription.NotEmpty}` })
  name?: string;

  @Field({ description: UserDescription.Email, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${UserDescription.Email}${ValidatorDescription.NotEmpty}` })
  email?: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: string;
}
