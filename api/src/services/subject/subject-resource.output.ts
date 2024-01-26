import { ObjectType } from '@nestjs/graphql';
import { ResourceSelectOutput } from '../resource/resource-select.output';

@ObjectType()
export class SubjectResourceOutput extends ResourceSelectOutput {}
