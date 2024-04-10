import { Field, InputType } from '@nestjs/graphql';
import { FileDescription, FILE_I18N, FileStatus, FILE_STATUSES } from './file.enum';
import { IsIn, IsNotEmpty } from 'class-validator';
import { ValidatorDescription, I18N, IsExist } from '@api/core';

@InputType()
export class FileCreateInput {
  @Field({ description: FileDescription.Uid })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Uid}${ValidatorDescription.IsNotEmpty}`),
  })
  uid: string;

  @Field({ description: FileDescription.Name })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  name: string;

  @Field({ description: FileDescription.Actualname })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Actualname}${ValidatorDescription.IsNotEmpty}`),
  })
  actualname: string;

  @Field({ description: FileDescription.Status })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Status}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsIn(FILE_STATUSES, {
    message: I18N(`${FILE_I18N}.${FileDescription.Status}${ValidatorDescription.IsIn}`),
  })
  status: FileStatus;

  @Field({ description: FileDescription.Size })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Size}${ValidatorDescription.IsNotEmpty}`),
  })
  size: number;

  @Field({ description: FileDescription.Mimetype })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Mimetype}${ValidatorDescription.IsNotEmpty}`),
  })
  mimetype: string;

  @Field({ description: FileDescription.Key })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Key}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('file', {
    message: I18N(`${FILE_I18N}.${FileDescription.Key}${ValidatorDescription.IsExist}`),
  })
  key: string;

  @Field({ description: FileDescription.Url })
  @IsNotEmpty({
    message: I18N(`${FILE_I18N}.${FileDescription.Url}${ValidatorDescription.IsNotEmpty}`),
  })
  url: string;
}
