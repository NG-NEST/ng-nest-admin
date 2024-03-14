import { ObjectType } from '@nestjs/graphql';
import { ResourceSelectOutput } from '../resource/select.output';

@ObjectType()
export class SubjectResourceOutput extends ResourceSelectOutput {}
