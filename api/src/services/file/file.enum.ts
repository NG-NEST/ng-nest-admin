export const FILE_I18N = 'file';

export enum FileAuth {}

export enum FileDescription {
  File = 'File',

  Id = 'FileId',
  Uid = 'Uid',
  Name = 'Name',
  Content = 'Content',
  Actualname = 'Actualname',
  Status = 'Status',
  Size = 'Size',
  Mimetype = 'Mimetype',
  Key = 'Key',
  Url = 'Url',

  Filepath = 'Filepath',
}

export enum FileStatus {
  Ready = 'Ready',
  Uploading = 'Uploading',
  Completed = 'Completed',
  Failed = 'Failed',
}

export const FILE_STATUSES = Object.values(FileStatus);
