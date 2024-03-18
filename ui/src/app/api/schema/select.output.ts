import { ObjectType } from '@nestjs/graphql';
import { Schema } from './schema.model';

@ObjectType()
export class SchemaSelectOutput extends Schema {}
