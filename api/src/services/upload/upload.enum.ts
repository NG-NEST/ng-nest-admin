export const UploadI18n = 'upload';

export enum UploadAuth {}

export enum UploadDescription {
  Upload = 'Upload',

  Id = 'UploadId',
  Uid = 'Uid',
  Name = 'Name',
  Actualname = 'Actualname',
  Status = 'Status',
  Size = 'Size',
  Mimetype = 'Mimetype',
  Key = 'Key',
  Url = 'Url',

  Filepath = 'Filepath',
}

export enum UploadStatus {
  Ready = 'ready',
  Uploading = 'uploading',
  Completed = 'completed',
  Failed = 'failed',
}
