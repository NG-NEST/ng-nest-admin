import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Subject,
  SubjectCache,
  SubjectCode,
  SubjectId,
  SubjectPaginationInput,
  SubjectPaginationOutput,
  SubjectResolverName,
  SubjectResourceOutput,
  SubjectSelectInput,
  SubjectSelectOutput,
  SubjectService,
} from '@api/services';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private subjectService: SubjectService) {}

  @Query(() => SubjectPaginationOutput, {
    description: SubjectResolverName.Subjects,
  })
  @CacheControl(SubjectCache.Subjects)
  async subjects(
    @Args() input: SubjectPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<SubjectPaginationOutput> {
    return await this.subjectService.subjects(input, select);
  }

  @Query(() => Subject, { description: SubjectResolverName.Subject })
  @CacheControl(SubjectCache.Subject)
  async subject(
    @Args('id', SubjectId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Subject> {
    return await this.subjectService.subject(id, select);
  }

  @Query(() => [SubjectSelectOutput], {
    description: SubjectResolverName.SubjectSelect,
  })
  @CacheControl(SubjectCache.SubjectSelect)
  async subjectSelect(
    @Args() input: SubjectSelectInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<SubjectSelectOutput[]> {
    return await this.subjectService.subjectSelect(input, select);
  }

  @Query(() => [SubjectResourceOutput], {
    description: SubjectResolverName.SubjectResources,
  })
  @CacheControl(SubjectCache.SubjectResources)
  async subjectResources(
    @Args('code', SubjectCode) code: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<SubjectResourceOutput[]> {
    return await this.subjectService.subjectResources(code, select);
  }
}
