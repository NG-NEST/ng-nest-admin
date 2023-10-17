import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserDescription } from '../enum';
import { BaseDescription } from '@api/core';
import { IsOptional } from 'class-validator';

@ObjectType()
export class UserSelectOutput {
  @Field(() => ID, { description: BaseDescription.Id })
  id: string;

  @Field({ description: UserDescription.Name })
  name: string;

  @Field({ description: UserDescription.Account })
  account: string;

  @Field({ description: UserDescription.Email })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: string;
}
