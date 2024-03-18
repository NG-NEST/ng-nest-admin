import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDescription } from './base.enum';
import { GqlDateMiddleware } from '../middlewares';

@ObjectType({ isAbstract: true })
export class BaseAudit {
  @Field({
    description: BaseDescription.CreatedAt,
    nullable: true,
    middleware: [GqlDateMiddleware],
  })
  createdAt?: Date;
  @Field({
    description: BaseDescription.UpdatedAt,
    nullable: true,
    middleware: [GqlDateMiddleware],
  })
  updatedAt?: Date;
}
