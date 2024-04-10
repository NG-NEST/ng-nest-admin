import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from '@api/services';
import { AuthModule } from '../auth';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FileInterceptor } from '@api/core';
import { FileModule } from '../file';

@Module({
  imports: [AuthModule, FileModule],
  controllers: [UploadController],
  providers: [UploadService, { provide: APP_INTERCEPTOR, useClass: FileInterceptor }],
})
export class UploadModule {}
