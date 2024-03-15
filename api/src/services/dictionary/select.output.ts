import { ObjectType } from '@nestjs/graphql';
import { Dictionary } from './dictionary.model';

@ObjectType()
export class DictionarySelectOutput extends Dictionary {}
