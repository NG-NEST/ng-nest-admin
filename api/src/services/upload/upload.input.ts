import { ValidatorDescription, i18n } from '@api/core';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UploadDescription, UploadI18n } from './upload.enum';
import { Optional } from '@nestjs/common';

@InputType()
export class UploadInput {
  @IsNotEmpty({
    message: i18n(`${UploadI18n}.${UploadDescription.Filepath}${ValidatorDescription.IsNotEmpty}`),
  })
  filepath: string;

  @Optional()
  actualname?: string;

  @Optional()
  @IsUUID(4, {
    message: i18n(`${UploadI18n}.${UploadDescription.Uid}${ValidatorDescription.IsUUID}`),
  })
  uid?: string;
}
