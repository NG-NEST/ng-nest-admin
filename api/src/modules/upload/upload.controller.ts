import { FileControl } from '@api/core';
import { UploadInput, UploadService } from '@api/services';
import { Body, Post, Controller, UploadedFile } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @FileControl('file')
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: UploadInput): Promise<any> {
    console.log(file, body);
    return this.uploadService.uploadCosExpress(file, body);
  }
}
