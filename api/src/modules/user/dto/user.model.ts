import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@api/core';
import { IsOptional } from 'class-validator';
import { UserDescription } from './user.enum';

@ObjectType()
export class User extends BaseModel {
  @Field({ description: UserDescription.Name })
  name: string;

  @Field({ description: UserDescription.Account })
  account: string;

  @Field({ description: UserDescription.Password })
  @HideField()
  password: string;

  @Field({ description: UserDescription.Email })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: string;
}
