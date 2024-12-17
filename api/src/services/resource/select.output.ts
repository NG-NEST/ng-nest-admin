import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Resource } from './resource.model';
import { ResourceDescription } from './resource.enum';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { Permission, PermissionDescription } from '../permission';

@ObjectType()
export class ResourceSelectOutput extends BaseAudit {
  @Field(() => ID, { description: ResourceDescription.Id })
  id: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  pid?: string;

  @Field(() => Resource, { description: ResourceDescription.Parent, nullable: true })
  @IsOptional()
  parent?: Resource;

  @Field(() => [Resource], { description: ResourceDescription.Children, nullable: true })
  @IsOptional()
  children?: Resource[];

  @Field({ description: ResourceDescription.Name })
  name: string;

  @Field({ description: ResourceDescription.Code })
  code: string;

  @Field({ description: ResourceDescription.Sort })
  sort: number;

  @Field({ description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [Permission], { description: PermissionDescription.Permission, nullable: true })
  @IsOptional()
  permissions?: Permission[];
}
