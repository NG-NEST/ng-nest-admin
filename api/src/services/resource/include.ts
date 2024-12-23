import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PermissionDescription, PermissionOrderInput, PermissionWhereInput } from '../permission';
import { PaginationDescription } from '@api/core';

@InputType()
class PermissionsInclude {
  @Field(() => PermissionWhereInput, {
    description: PaginationDescription.Where,
    nullable: true,
  })
  @IsOptional()
  where?: PermissionWhereInput;
  @Field(() => PermissionOrderInput, {
    description: PaginationDescription.OrderBy,
    nullable: true,
  })
  @IsOptional()
  orderBy?: PermissionOrderInput;
}

@InputType()
export class ResourceIncludeInput {
  @Field(() => PermissionsInclude, {
    description: PermissionDescription.Permission,
    nullable: true,
  })
  @IsOptional()
  permissions?: PermissionsInclude;
}
