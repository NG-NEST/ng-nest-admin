import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Catalogue,
  CatalogueCache,
  CatalogueId,
  CataloguePaginationInput,
  CataloguePaginationOutput,
  CatalogueResolverName,
  CatalogueSelectInput,
  CatalogueSelectOutput,
  CatalogueService,
} from '@api/services';

@Resolver(() => Catalogue)
export class CatalogueResolver {
  constructor(private catalogueService: CatalogueService) {}

  @Query(() => CataloguePaginationOutput, {
    description: CatalogueResolverName.Catalogues,
  })
  @CacheControl(CatalogueCache.Catalogues)
  async catalogues(
    @Args() input: CataloguePaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<CataloguePaginationOutput> {
    return await this.catalogueService.catalogues(input, select);
  }

  @Query(() => Catalogue, { description: CatalogueResolverName.Catalogue })
  @CacheControl(CatalogueCache.Catalogue)
  async catalogue(
    @Args('id', CatalogueId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Catalogue> {
    return await this.catalogueService.catalogue(id, select);
  }

  @Query(() => [CatalogueSelectOutput], {
    description: CatalogueResolverName.CatalogueSelect,
  })
  @CacheControl(CatalogueCache.CatalogueSelect)
  async catalogueSelect(
    @Args() input: CatalogueSelectInput,
    @PrismaSelect() select: BaseSelect,
  ): Promise<CatalogueSelectOutput[]> {
    return await this.catalogueService.catalogueSelect(input, select);
  }
}
