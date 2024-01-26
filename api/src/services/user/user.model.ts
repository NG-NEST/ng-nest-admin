import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { Role } from '../role';
import { UserDescription, UserIncludeDescription } from './user.enum';

@ObjectType()
export class UserRole {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  roleId?: string;

  @Field(() => Role, { description: UserIncludeDescription.UserRole, nullable: true })
  @IsOptional()
  role?: Role;
}

@ObjectType()
export class User extends BaseAudit {
  @Field(() => ID, { description: UserDescription.Id })
  id: string;

  @Field({ description: UserDescription.Name })
  name: string;

  @Field({ description: UserDescription.Account })
  account: string;

  @HideField()
  password: string;

  @Field({ description: UserDescription.Email })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => [UserRole], { description: UserIncludeDescription.UserRole, nullable: true })
  @IsOptional()
  roles?: UserRole[];
}
