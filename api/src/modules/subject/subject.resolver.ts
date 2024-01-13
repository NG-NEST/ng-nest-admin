import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseID, BaseSelect, PrismaSelect } from '@api/core';
import { SubjectPaginationInput, SubjectPaginationOutput, SubjectSelectOutput } from './dto';
import { SubjectService } from './subject.service';
import { Subject } from './model';
import { SubjectResolverName } from './enum';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth';

@UseGuards(GqlAuthGuard)
@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private subjectService: SubjectService) {}

  @Query(() => SubjectPaginationOutput, { description: SubjectResolverName.Subjects })
  async subjects(@Args() input: SubjectPaginationInput, @PrismaSelect('data') select: BaseSelect): Promise<SubjectPaginationOutput> {
    return await this.subjectService.subjects(input, select);
  }

  @Query(() => Subject, { description: SubjectResolverName.Subject, nullable: true })
  async subject(@Args('id', BaseID) id: string, @PrismaSelect() select: BaseSelect): Promise<Subject> {
    return await this.subjectService.subject(id, select);
  }

  @Query(() => [SubjectSelectOutput], { description: SubjectResolverName.SubjectSelect })
  async subjectSelect(@PrismaSelect('data') select: BaseSelect): Promise<SubjectSelectOutput[]> {
    return await this.subjectService.subjectSelect(select);
  }
}
