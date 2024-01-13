import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@api/core';
import { RoleDescription } from '../enum';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Role extends BaseModel {
  @Field({ description: RoleDescription.Name })
  name: string;

  @Field({ description: RoleDescription.Description })
  @IsOptional()
  description?: string;
}
