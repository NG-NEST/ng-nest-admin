import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit, BaseModel } from '@api/core';
import { RoleDescription, RoleIncludeDescription } from '../enum';
import { IsOptional } from 'class-validator';
import { User } from '@api/modules';

@ObjectType()
export class RoleUser extends BaseAudit {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  userId?: string;

  @Field(() => User, { description: RoleIncludeDescription.RoleUser, nullable: true })
  @IsOptional()
  user?: User;
}

@ObjectType()
export class Role extends BaseModel {
  @Field({ description: RoleDescription.Name })
  name: string;

  @Field({ description: RoleDescription.Description })
  @IsOptional()
  description?: string;

  @Field(() => [RoleUser], { description: RoleIncludeDescription.RoleUser, nullable: true })
  @IsOptional()
  users?: RoleUser[];
}
