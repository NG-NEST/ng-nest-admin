import { SetMetadata } from '@nestjs/common';

export const FILES_METADATA = 'files';
export const FilesControl = (...keys: string[]) => SetMetadata(FILES_METADATA, keys);
