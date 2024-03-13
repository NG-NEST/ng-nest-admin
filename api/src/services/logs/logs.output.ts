import { Field, ObjectType } from '@nestjs/graphql';
import { LogsDescription } from './logs.enum';
import { LogsFile } from './logs-file.model';

@ObjectType()
export class LogsOutput {
  @Field(() => [LogsFile], { description: LogsDescription.Error, nullable: true })
  error?: LogsFile[];
  @Field(() => [LogsFile], { description: LogsDescription.Http, nullable: true })
  http?: LogsFile[];
  @Field(() => [LogsFile], { description: LogsDescription.Info, nullable: true })
  info?: LogsFile[];
  @Field(() => [LogsFile], { description: LogsDescription.Cache, nullable: true })
  cache?: LogsFile[];
  @Field(() => [LogsFile], { description: LogsDescription.Prisma, nullable: true })
  prisma?: LogsFile[];
  @Field(() => [LogsFile], { description: LogsDescription.Warn, nullable: true })
  warn?: LogsFile[];
}
