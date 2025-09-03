import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { ModelDescription } from './model.enum';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Model extends BaseAudit {
  @Field(() => ID, { description: ModelDescription.Id })
  id: string;

  @Field(() => String, { description: ModelDescription.Name })
  name: string;

  @Field(() => String, { description: ModelDescription.Type })
  type: string;

  @Field(() => String, { description: ModelDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
