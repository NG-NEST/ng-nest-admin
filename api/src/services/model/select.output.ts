import { ObjectType } from '@nestjs/graphql';
import { Model } from './model.model';

@ObjectType()
export class ModelSelectOutput extends Model {}
