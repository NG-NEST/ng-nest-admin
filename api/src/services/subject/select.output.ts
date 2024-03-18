import { ObjectType } from '@nestjs/graphql';
import { Subject } from './subject.model';

@ObjectType()
export class SubjectSelectOutput extends Subject {}
