import { CosService } from '@api/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UploadStatus } from './upload.enum';
import { UploadInput } from './upload.input';

@Injectable()
export class UploadService {
  constructor(private readonly cos: CosService) {}

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
        .then(async (res: any) => {
          const upload = {
            size,
            name: name,
            actualname,
            status: UploadStatus.Completed,
            mimetype,
            key,
            uid,
            url: res.Location,
          };

          resolve(upload);
        })
        .catch((e) => {
          throw new BadRequestException(e);
        });
    });
  }
}
