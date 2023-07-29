import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BaseDescription } from './base.enum';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID, { description: BaseDescription.Id })
  id: string;
  @Field(() => Date, { description: BaseDescription.CreatedAt, nullable: true })
  createdAt?: Date;
  @Field(() => Date, { description: BaseDescription.UpdatedAt, nullable: true })
  updatedAt?: Date;
}
