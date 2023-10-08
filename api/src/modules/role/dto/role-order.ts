import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { RoleDescription } from '../enum';

@InputType()
export class RoleOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: RoleDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: SortOrder;
}
