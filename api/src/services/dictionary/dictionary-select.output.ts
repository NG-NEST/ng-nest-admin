import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { DictionaryDescription } from './dictionary.enum';

@ObjectType()
export class DictionarySelectOutput {
  @Field(() => ID, { description: DictionaryDescription.Pid, nullable: true })
  @IsOptional()
  pid?: string;

  @Field(() => ID, { description: DictionaryDescription.Id })
  id: string;

  @Field({ description: DictionaryDescription.Name })
  name: string;

  @Field({ description: DictionaryDescription.Code })
  code: string;

  @Field({ description: DictionaryDescription.Sort, nullable: true })
  @IsOptional()
  sort?: number;

  @Field({ description: DictionaryDescription.Sort, nullable: true })
  @IsOptional()
  description?: string;
}
