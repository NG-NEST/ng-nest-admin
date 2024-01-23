import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ResourceDescription } from './resource.enum';

@ObjectType()
export class ResourceSelectOutput {
  @Field(() => ID, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  pid?: string;

  @Field(() => ID, { description: ResourceDescription.Id })
  id: string;

  @Field({ description: ResourceDescription.Name })
  name: string;

  @Field({ description: ResourceDescription.Code })
  code: string;

  @Field({ description: ResourceDescription.Sort, nullable: true })
  @IsOptional()
  sort?: number;

  @Field({ description: ResourceDescription.Sort, nullable: true })
  @IsOptional()
  description?: string;
}
