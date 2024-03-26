import { Module } from '@nestjs/common';
import { AigcController } from './aigc.controller';
import { AuthModule } from '../auth/auth.module';
import { AigcService, QwenService } from '@api/services';

@Module({
  imports: [AuthModule],
  controllers: [AigcController],
  providers: [AigcService, QwenService],
})
export class AigcModule {}
