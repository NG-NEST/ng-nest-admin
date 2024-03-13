import { Resolver, Query } from '@nestjs/graphql';
import { LogsFile, LogsOutput, LogsResolverName, LogsService } from '@api/services';
import { BaseSelect, PrismaSelect } from '@api/core';

@Resolver(() => LogsFile)
export class LogsResolver {
  constructor(private readonly logsService: LogsService) {}

  @Query(() => LogsOutput, {
    description: LogsResolverName.Logs,
  })
  async logs(@PrismaSelect() select: BaseSelect): Promise<LogsOutput> {
    return await this.logsService.logs(select);
  }
}
