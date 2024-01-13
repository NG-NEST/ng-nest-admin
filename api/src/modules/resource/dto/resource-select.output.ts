import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ResourceDescription } from '../enum';
import { BaseDescription } from '@api/core';

@ObjectType()
export class ResourceSelectOutput {
  @Field(() => ID, { description: BaseDescription.Id })
  id: string;

  @Field({ description: ResourceDescription.Name })
  name: string;
}
