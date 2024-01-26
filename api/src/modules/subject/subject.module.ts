import { Module } from '@nestjs/common';
import { SubjectResolver } from './subject.resolver';
import { SubjectService } from '../../services/subject/subject.service';
import { SubjectController } from './subject.controller';

@Module({
  controllers: [SubjectController],
  providers: [SubjectResolver, SubjectService]
})
export class SubjectModule {}
