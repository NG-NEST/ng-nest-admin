import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { RoleDescription } from './role.enum';
import { Permission, PermissionDescription } from '../permission';

@ObjectType()
export class RolePermission {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  permissionId?: string;

  @Field(() => Permission, { description: PermissionDescription.Permission, nullable: true })
  @IsOptional()
  permission?: Permission;
}

@ObjectType()
export class Role extends BaseAudit {
  @Field(() => ID, { description: RoleDescription.Id })
  id: string;

  @Field({ description: RoleDescription.Name })
  name: string;

  @Field({ description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [RolePermission], { description: PermissionDescription.Permission, nullable: true })
  @IsOptional()
  permissions?: RolePermission[];
}
