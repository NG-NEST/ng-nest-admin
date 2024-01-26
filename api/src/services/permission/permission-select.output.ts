import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PermissionDescription } from './permission.enum';
import { IsOptional } from 'class-validator';

@ObjectType()
export class PermissionSelectOutput {
  @Field(() => ID, { description: PermissionDescription.Id })
  id: string;

  @Field({ description: PermissionDescription.Name })
  name: string;

  @Field({ description: PermissionDescription.Code })
  code: string;

  @Field({ description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  sort?: number;

  @Field({ description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  description?: string;
}
