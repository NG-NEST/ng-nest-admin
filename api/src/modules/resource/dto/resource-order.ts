import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ResourceDescription } from '../enum';

@InputType()
export class ResourceOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: ResourceDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: SortOrder;
}
