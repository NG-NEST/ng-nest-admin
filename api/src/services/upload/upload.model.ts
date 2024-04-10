import { ObjectType } from '@nestjs/graphql';
import { File } from '../file';

@ObjectType()
export class Upload extends File {}
