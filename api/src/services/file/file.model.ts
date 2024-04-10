import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { FileDescription, FileStatus } from './file.enum';

@ObjectType()
export class File extends BaseAudit {
  @Field(() => ID, { description: FileDescription.Id })
  id: string;

  @Field({ description: FileDescription.Uid })
  uid: string;

  @Field({ description: FileDescription.Name })
  name: string;

  @Field({ description: FileDescription.Actualname })
  actualname: string;

  @Field({ description: FileDescription.Status })
  status: FileStatus;

  @Field({ description: FileDescription.Size })
  size: number;

  @Field({ description: FileDescription.Mimetype })
  mimetype: string;

  @Field({ description: FileDescription.Mimetype })
  key: string;

  @Field({ description: FileDescription.Mimetype })
  url: string;
}
