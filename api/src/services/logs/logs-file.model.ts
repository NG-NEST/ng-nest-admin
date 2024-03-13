import { Field, ObjectType } from '@nestjs/graphql';
import { LogsDescription } from './logs.enum';

@ObjectType()
export class LogsFile {
  @Field(() => String, { description: LogsDescription.Name, nullable: true })
  name?: string;
  @Field(() => String, { description: LogsDescription.Type, nullable: true })
  type?: string;
  @Field(() => String, { description: LogsDescription.Extension, nullable: true })
  extension?: string;
}
