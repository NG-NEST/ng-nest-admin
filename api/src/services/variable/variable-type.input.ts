import { ArgsType, Field } from '@nestjs/graphql';
import { ResourceDescription } from '../resource';
import { VariableDescription } from './variable.enum';

@ArgsType()
export class VariableTypeInput {
  @Field({ description: ResourceDescription.Id, nullable: true })
  resourceId?: string;

  @Field({ description: VariableDescription.Type, nullable: true })
  type?: string;

  @Field({ description: VariableDescription.SchemaType, nullable: true })
  schemaType?: string;
}
