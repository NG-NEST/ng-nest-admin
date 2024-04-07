import { SetMetadata } from '@nestjs/common';

export const FILE_METADATA = 'file';
export const FileControl = (key: string) => SetMetadata(FILE_METADATA, key);
