import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BaseDescription } from './base.enum';

@ObjectType({ isAbstract: true })
export class BaseAudit {
  @Field(() => Date, { description: BaseDescription.CreatedAt, nullable: true })
  createdAt?: Date;
  @Field(() => Date, { description: BaseDescription.UpdatedAt, nullable: true })
  updatedAt?: Date;
}

@ObjectType({ isAbstract: true })
export abstract class BaseModel extends BaseAudit {
  @Field(() => ID, { description: BaseDescription.Id })
  id: string;
}
