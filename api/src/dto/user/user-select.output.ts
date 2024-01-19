import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserDescription } from './user.enum';

@ObjectType()
export class UserSelectOutput {
  @Field(() => ID, { description: UserDescription.Id })
  id: string;

  @Field({ description: UserDescription.Name })
  name: string;

  @Field({ description: UserDescription.Account })
  account: string;

  @Field({ description: UserDescription.Email })
  email: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: string;
}
