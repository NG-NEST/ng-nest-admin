import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VariableDescription } from './variable.enum';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';

@ObjectType()
export class VariableSelectOutput extends BaseAudit {
  @Field(() => ID, { description: VariableDescription.Id })
  id: string;

  @Field({ description: VariableDescription.Code })
  code: string;

  @Field({ description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field({ description: VariableDescription.Value, nullable: true })
  @IsOptional()
  value?: string;

  @Field({ description: VariableDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
