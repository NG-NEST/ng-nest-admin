import { ObjectType } from '@nestjs/graphql';
import { Prompt } from './prompt.model';

@ObjectType()
export class PromptSelectOutput extends Prompt {}
