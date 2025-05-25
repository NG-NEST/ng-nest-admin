import { CosService } from '@api/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UploadInput } from './upload.input';
import { PutObjectResult } from 'cos-nodejs-sdk-v5';
import { FileService, FileStatus, File } from '../file';
import { MultipartFile } from '@fastify/multipart';
import { basename } from 'path';

@Injectable()
export class UploadService {
  constructor(
    private readonly cos: CosService,
    private readonly file: FileService,
  ) {}

  async uploadCosExpress(file: Express.Multer.File, body: UploadInput) {
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

  async uploadCosFastify(file: MultipartFile, body: UploadInput): Promise<File> {
    let { filepath, actualname, uid } = body;
    let { mimetype, filename } = file;
    let buffer = await file.toBuffer();
    let size = buffer.length;
    if (!uid) uid = v4();

    const name = decodeURIComponent(filename);
    const key = `${filepath}/${uid}/${name}`;

    if (!actualname) actualname = basename(name);

    return new Promise(async (resolve) => {
      resolve({
        id: v4(),
        size,
        name,
        actualname,
        status: FileStatus.Completed,
        mimetype,
        key,
        uid,
        url: 'https://ngnest.com/img/logo/logo-32x32.png',
      });
      // this.cos
      //   .putObject({
      //     Key: key,
      //     Body: buffer,
      //   })
      //   .then(async (res: PutObjectResult) => {
      //     const upload = {
      //       size,
      //       name,
      //       actualname,
      //       status: FileStatus.Completed,
      //       mimetype,
      //       key,
      //       uid,
      //       url: res.Location,
      //     };

      //     const result = await this.file.create(upload);

      //     resolve(result as File);
      //   })
      //   .catch((e) => {
      //     throw new BadRequestException(e);
      //   });
    });
  }
}
