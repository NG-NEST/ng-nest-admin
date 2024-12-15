import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { PermissionDescription } from './permission.enum';

@ObjectType()
export class Permission extends BaseAudit {
  @Field(() => ID, { description: PermissionDescription.Id })
  id: string;

  @Field({ description: PermissionDescription.Name })
  name: string;

  @Field({ description: PermissionDescription.Code })
  code: string;

  @Field({ description: PermissionDescription.Sort })
  sort: number;

  @Field({ description: PermissionDescription.Description })
  @IsOptional()
  description?: string;

  @Field({ description: PermissionDescription.ResourceId })
  resourceId: string;
}
