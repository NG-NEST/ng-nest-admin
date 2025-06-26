import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CatalogueDescription } from './catalogue.enum';
import { ResourceDescription, ResourceOrderInput } from '../resource';
import { VariableDescription, VariableOrderInput } from '../variable';

@InputType()
export class CatalogueOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: CatalogueDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: CatalogueDescription.Type, nullable: true })
  @IsOptional()
  type?: SortOrder;

  @Field(() => SortOrder, { description: CatalogueDescription.FileType, nullable: true })
  @IsOptional()
  fileType?: SortOrder;

  @Field(() => SortOrder, { description: CatalogueDescription.Sort, nullable: true })
  @IsOptional()
  sort?: SortOrder;

  @Field(() => SortOrder, { description: CatalogueDescription.Many, nullable: true })
  @IsOptional()
  many?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Id, nullable: true })
  @IsOptional()
  resourceId?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Resource, nullable: true })
  @IsOptional()
  resource?: ResourceOrderInput;

  @Field(() => SortOrder, { description: VariableDescription.Id, nullable: true })
  @IsOptional()
  variableId?: SortOrder;

  @Field(() => SortOrder, { description: VariableDescription.Variable, nullable: true })
  @IsOptional()
  variable?: VariableOrderInput;
}
