import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'routes';
export const Authorization = (...routes: string[]) => SetMetadata(PERMISSION_KEY, routes);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
