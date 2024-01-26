import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDescription } from './base.enum';

@ObjectType({ isAbstract: true })
export class BaseAudit {
  @Field(() => Date, { description: BaseDescription.CreatedAt, nullable: true })
  createdAt?: Date;
  @Field(() => Date, { description: BaseDescription.UpdatedAt, nullable: true })
  updatedAt?: Date;
}
