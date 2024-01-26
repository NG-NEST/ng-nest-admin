import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { SubjectDescription } from '../subject';
import { ResourceDescription } from './resource.enum';

@InputType()
export class ResourceOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: ResourceDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Sort, nullable: true })
  @IsOptional()
  sort?: SortOrder;

  @Field(() => SortOrder, { description: SubjectDescription.Id, nullable: true })
  @IsOptional()
  subjectId?: SortOrder;
}
