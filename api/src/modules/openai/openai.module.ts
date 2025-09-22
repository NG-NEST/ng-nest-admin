import { Module } from '@nestjs/common';
import { OpenAIController } from './openai.controller';
import { DashscopeService, OpenAIService } from '@api/services';

@Module({
  controllers: [OpenAIController],
  providers: [OpenAIService, DashscopeService],
})
export class OpenAIModule {}
