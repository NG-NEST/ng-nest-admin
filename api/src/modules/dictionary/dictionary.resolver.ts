import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, PrismaSelect } from '@api/core';
import {
  Dictionary,
  DictionaryId,
  DictionaryPaginationInput,
  DictionaryPaginationOutput,
  DictionaryResolverName,
  DictionarySelectOutput,
  DictionaryService,
  SubjectId,
} from '@api/services';

@Resolver(() => Dictionary)
export class DictionaryResolver {
  constructor(private dictionaryService: DictionaryService) {}

  @Query(() => DictionaryPaginationOutput, {
    description: DictionaryResolverName.Dictionaries,
  })
  async dictionaries(
    @Args() input: DictionaryPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<DictionaryPaginationOutput> {
    return await this.dictionaryService.dictionaries(input, select);
  }

  @Query(() => Dictionary, { description: DictionaryResolverName.Dictionary })
  async dictionary(
    @Args('id', DictionaryId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Dictionary> {
    return await this.dictionaryService.dictionary(id, select);
  }

  @Query(() => [DictionarySelectOutput], {
    description: DictionaryResolverName.DictionarySelect,
  })
  async dictionarySelect(
    @Args('subjectId', SubjectId) subjectId: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<DictionarySelectOutput[]> {
    return await this.dictionaryService.dictionarySelect(subjectId, select);
  }
}
