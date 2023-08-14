import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit, BaseModel } from '@api/core';
import { IsOptional } from 'class-validator';
import { UserDescription, UserIncludeDescription } from './user.enum';
import { Role } from '@api/modules';

@ObjectType()
export class UserRole extends BaseAudit {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  roleId?: string;

  @Field(() => Role, { description: UserIncludeDescription.UserRole, nullable: true })
  @IsOptional()
  role?: Role;
}

@ObjectType()
export class User extends BaseModel {
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
