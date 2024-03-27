import { Module } from '@nestjs/common';
import { AigcController } from './aigc.controller';
import { AuthModule } from '../auth/auth.module';
import { AigcGateway, AigcService, GeminiService, QwenService } from '@api/services';

@Module({
  imports: [AuthModule],
  controllers: [AigcController],
  providers: [AigcGateway, AigcService, QwenService, GeminiService],
  exports: [AigcGateway],
})
export class AigcModule {}
