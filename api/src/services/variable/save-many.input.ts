import { Field, InputType } from '@nestjs/graphql';
import { Variable } from './variable.model';
import { VariableDescription } from './variable.enum';

@InputType()
export class VariableSaveManyInput {
  @Field({ description: VariableDescription.Many })
  many: Variable[];

  @Field({ description: VariableDescription.ResourceId })
  resourceId: string;

  @Field({ description: VariableDescription.VariableCategoryId })
  variableCategoryId: string;
}
