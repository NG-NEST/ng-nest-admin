import { BaseInclude } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserIncludeDescription } from './user.enum';

@InputType()
export class UserInclude {
  @Field(() => Boolean, { description: UserIncludeDescription.UserRole, nullable: true })
  @IsOptional()
  role?: boolean;
}

@InputType()
export class UserRoleInclude extends BaseInclude(UserInclude) {}

@InputType()
export class UserIncludeInput {
  @Field(() => UserRoleInclude, { description: UserIncludeDescription.UserRole, nullable: true })
  @IsOptional()
  roles?: UserRoleInclude;
}
