import { Controller, Post, UseInterceptors, UploadedFiles, Body, Get, Param, Headers, Res, HttpStatus } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';
import * as fs from 'fs-extra';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  rootPath = join(__dirname, '../../../files');
  constructor(public readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async upload(@UploadedFiles() files, @Body() body, @Headers() headers): Promise<string[]> {
    let fileUrls = [];
    for (const file of files) {
      let filename = `${Date.now()}-${file.originalname}`;
      fs.writeFileSync(join(this.rootPath, filename), file.buffer, 'utf8');
      fileUrls = [...fileUrls, `${global['host']}/upload/${filename}`];
    }
    return fileUrls;
  }

  @Get('/:filename')
  getFile(@Res() res: Response, @Param('filename') filename: string) {
    res.sendFile(join(this.rootPath, filename));
  }
}
