import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { AuthModule } from '../auth/auth.module';
import { LogsResolver } from './logs.resolver';
import { LogsService } from '@api/services';

@Module({
  imports: [AuthModule],
  controllers: [LogsController],
  providers: [LogsResolver, LogsService],
})
export class LogsModule {}
