import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as COS from 'cos-nodejs-sdk-v5';

@Injectable()
export class CosService implements OnModuleInit {
  cos: COS;
  bucket: string;
  region: string;
  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.bucket = this.config.getOrThrow('COS_BUCKET');
    this.region = this.config.getOrThrow('COS_REGION');
    this.cos = new COS({
      SecretId: this.config.getOrThrow('COS_SECRET_ID'),
      SecretKey: this.config.getOrThrow('COS_SECRET_KEY'),
    });
  }

  async putObject(params: {
    Key: string;
    Body: Buffer;
    [key: string]: any;
  }): Promise<COS.PutObjectResult> {
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket: this.bucket,
          Region: this.region,

          ...params,
        },
        (err: COS.CosSdkError, data: COS.PutObjectResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  async getObject(params: { Key: string; [key: string]: any }): Promise<COS.GetObjectResult> {
    return new Promise((resolve, reject) => {
      this.cos.getObject(
        {
          Bucket: this.bucket,
          Region: this.region,
          ...params,
        },
        (err: COS.CosSdkError, data: COS.GetObjectResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  async deleteObject(params: { Key: string; [key: string]: any }): Promise<COS.DeleteObjectResult> {
    return new Promise((resolve, reject) => {
      this.cos.deleteObject(
        {
          Bucket: this.bucket,
          Region: this.region,
          ...params,
        },
        (err: COS.CosSdkError, data: COS.DeleteObjectResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  async putObjectCopy(params: {
    Key: string;
    CopySource: string;
    [key: string]: any;
  }): Promise<COS.PutObjectCopyResult> {
    return new Promise((resolve, reject) => {
      this.cos.putObjectCopy(
        {
          Bucket: this.bucket,
          Region: this.region,
          ...params,
        },
        (err: COS.CosSdkError, data: COS.PutObjectCopyResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }
}
