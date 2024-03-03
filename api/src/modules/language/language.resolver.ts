import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, PrismaSelect } from '@api/core';
import {
  Language,
  LanguageId,
  LanguagePaginationInput,
  LanguagePaginationOutput,
  LanguageResolverName,
  LanguageSelectOutput,
  LanguageService,
} from '@api/services';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private languageService: LanguageService) {}

  @Query(() => LanguagePaginationOutput, {
    description: LanguageResolverName.Languages,
  })
  async languages(
    @Args() input: LanguagePaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<LanguagePaginationOutput> {
    return await this.languageService.languages(input, select);
  }

  @Query(() => Language, { description: LanguageResolverName.Language })
  async language(
    @Args('id', LanguageId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Language> {
    return await this.languageService.language(id, select);
  }

  @Query(() => [LanguageSelectOutput], {
    description: LanguageResolverName.LanguageSelect,
  })
  async languageSelect(@PrismaSelect('data') select: BaseSelect): Promise<LanguageSelectOutput[]> {
    return await this.languageService.languageSelect(select);
  }
}
