import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoleDescription } from '../enum';
import { BaseDescription } from '@api/core';
import { IsOptional } from 'class-validator';

@ObjectType()
export class RoleSelectOutput {
  @Field(() => ID, { description: BaseDescription.Id })
  id: string;

  @Field({ description: RoleDescription.Name })
  name: string;

  @Field({ description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
