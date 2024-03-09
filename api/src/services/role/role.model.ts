import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { RoleDescription } from './role.enum';

@ObjectType()
export class Role extends BaseAudit {
  @Field(() => ID, { description: RoleDescription.Id })
  id: string;

  @Field({ description: RoleDescription.Name })
  name: string;

  @Field({ description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
