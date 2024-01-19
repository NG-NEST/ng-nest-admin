import { ObjectType } from '@nestjs/graphql';
import { ResourceSelectOutput } from 'src/dto/resource/resource-select.output';

@ObjectType()
export class SubjectResourceOutput extends ResourceSelectOutput {}
