import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PermissionDescription } from './permission.enum';

@InputType()
export class PermissionOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: PermissionDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: PermissionDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;

  @Field(() => SortOrder, { description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  sort?: SortOrder;

  @Field(() => SortOrder, { description: PermissionDescription.Description, nullable: true })
  @IsOptional()
  description?: SortOrder;
}
