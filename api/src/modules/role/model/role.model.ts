import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@api/core';
import { RoleDescription } from '../enum';

@ObjectType()
export class Role extends BaseModel {
  @Field({ description: RoleDescription.Name })
  name: string;

  @Field({ description: RoleDescription.Code })
  code: string;
}
