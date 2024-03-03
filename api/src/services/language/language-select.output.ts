import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LanguageDescription } from './language.enum';

@ObjectType()
export class LanguageSelectOutput {
  @Field(() => ID, { description: LanguageDescription.Id })
  id: string;

  @Field({ description: LanguageDescription.Key })
  key: string;

  @Field({ description: LanguageDescription.Value })
  value: string;
}
