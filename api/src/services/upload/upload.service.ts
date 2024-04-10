import { CosService } from '@api/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UploadInput } from './upload.input';
import { PutObjectResult } from 'cos-nodejs-sdk-v5';
import { FileService, FileStatus } from '../file';

@Injectable()
export class UploadService {
  constructor(
    private readonly cos: CosService,
    private readonly file: FileService,
  ) {}

  async uploadCos(file: Express.Multer.File, body: UploadInput) {
    let { filepath, actualname, uid } = body;
    let { size, mimetype, originalname } = file;
    if (!uid) uid = v4();
    if (!actualname) actualname = originalname;
    const name = decodeURIComponent(originalname);
    const key = `${filepath}/${uid}/${name}`;

    return new Promise(async (resolve) => {
      this.cos
        .putObject({
          Key: key,
          Body: file.buffer,
        })
        .then(async (res: PutObjectResult) => {
          const upload = {
            size,
            name,
            actualname,
            status: FileStatus.Completed,
            mimetype,
            key,
            uid,
            url: res.Location,
          };

          const result = await this.file.create(upload);

          resolve(result);
        })
        .catch((e) => {
          throw new BadRequestException(e);
        });
    });
  }
}
