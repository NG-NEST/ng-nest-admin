import { Module } from '@nestjs/common';
import { AigcController } from './aigc.controller';
import { AigcGateway } from './aigc.gateway';
import { AuthModule } from '../auth/auth.module';
import { AigcService, GeminiService, QianFanService, QwenService } from '@api/services';

@Module({
  imports: [AuthModule],
  controllers: [AigcController],
  providers: [AigcGateway, AigcService, QwenService, GeminiService, QianFanService],
  exports: [AigcGateway],
})
export class AigcModule {}
