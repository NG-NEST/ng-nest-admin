import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { UploadDescription, UploadStatus } from './upload.enum';

@ObjectType()
export class Upload extends BaseAudit {
  @Field(() => ID, { description: UploadDescription.Id })
  id: string;

  @Field({ description: UploadDescription.Uid })
  uid: string;

  @Field({ description: UploadDescription.Name })
  name: string;

  @Field({ description: UploadDescription.Actualname })
  actualname: string;

  @Field({ description: UploadDescription.Status })
  status: UploadStatus;

  @Field({ description: UploadDescription.Size })
  size: number;

  @Field({ description: UploadDescription.Mimetype })
  mimetype: string;

  @Field({ description: UploadDescription.Mimetype })
  key: string;

  @Field({ description: UploadDescription.Mimetype })
  url: string;
}
