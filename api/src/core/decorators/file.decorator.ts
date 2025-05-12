import { SetMetadata } from '@nestjs/common';

export const FILE_METADATA = 'file';
export const FileControl = (...keys: string[]) => SetMetadata(FILE_METADATA, keys);
