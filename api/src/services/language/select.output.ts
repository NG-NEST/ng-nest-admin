import { ObjectType } from '@nestjs/graphql';
import { Language } from './language.model';

@ObjectType()
export class LanguageSelectOutput extends Language {}
