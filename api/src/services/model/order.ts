import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ModelDescription } from './model.enum';

@InputType()
export class ModelOrderInput extends BaseOrder {
    
  @Field(() => SortOrder, { description: ModelDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;
  
  @Field(() => SortOrder, { description: ModelDescription.Type, nullable: true })
  @IsOptional()
  type?: SortOrder;
  
  @Field(() => SortOrder, { description: ModelDescription.Description, nullable: true })
  @IsOptional()
  description?: SortOrder;
  
}
