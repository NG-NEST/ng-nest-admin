import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { SubjectDescription } from './subject.enum';

@InputType()
export class SubjectOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: SubjectDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: SubjectDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;

  @Field(() => SortOrder, { description: SubjectDescription.Description, nullable: true })
  @IsOptional()
  description?: SortOrder;
}
