import { ValidatorDescription, I18N } from '@api/core';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UploadDescription, UPLOAD_I18N } from './upload.enum';
import { Optional } from '@nestjs/common';

@InputType()
export class UploadInput {
  @IsNotEmpty({
    message: I18N(`${UPLOAD_I18N}.${UploadDescription.Filepath}${ValidatorDescription.IsNotEmpty}`),
  })
  filepath: string;

  @Optional()
  actualname?: string;

  @Optional()
  @IsUUID(4, {
    message: I18N(`${UPLOAD_I18N}.${UploadDescription.Uid}${ValidatorDescription.IsUUID}`),
  })
  uid?: string;
}
