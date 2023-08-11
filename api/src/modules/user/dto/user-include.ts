import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UserInclude {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  role?: boolean;
}

@InputType()
export class UserRoleInclude {
  @Field(() => UserInclude, { nullable: true })
  @IsOptional()
  include?: UserInclude;
}

@InputType()
export class UserIncludeInput {
  @Field(() => UserRoleInclude, { nullable: true })
  @IsOptional()
  roles?: UserRoleInclude;
}
