import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { RoleDescription } from './role.enum';

@ObjectType()
export class RoleSelectOutput {
  @Field(() => ID, { description: RoleDescription.Id })
  id: string;

  @Field({ description: RoleDescription.Name })
  name: string;

  @Field({ description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
