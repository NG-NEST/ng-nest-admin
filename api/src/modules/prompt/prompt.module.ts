import { Module } from '@nestjs/common';
import { PromptResolver } from './prompt.resolver';
import { PromptController } from './prompt.controller';
import { PromptService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PromptController],
  providers: [PromptResolver, PromptService],
})
export class PromptModule {}
