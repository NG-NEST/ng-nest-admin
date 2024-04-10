import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { FileService } from '@api/services';

@Module({
  imports: [AuthModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
