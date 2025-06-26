import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  SchemaData,
  SchemaDataCache,
  SchemaDataId,
  SchemaDataPaginationInput,
  SchemaDataPaginationOutput,
  SchemaDataResolverName,
  SchemaDataSelectInput,
  SchemaDataSelectOutput,
  SchemaDataService,
} from '@api/services';

@Resolver(() => SchemaData)
export class SchemaDataResolver {
  constructor(private schemaDataService: SchemaDataService) {}

  @Query(() => SchemaDataPaginationOutput, {
    description: SchemaDataResolverName.SchemaDatas,
  })
  @CacheControl(SchemaDataCache.SchemaDatas)
  async schemaDatas(
    @Args() input: SchemaDataPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<SchemaDataPaginationOutput> {
    return await this.schemaDataService.schemaDatas(input, select);
  }

  @Query(() => SchemaData, { description: SchemaDataResolverName.SchemaData })
  @CacheControl(SchemaDataCache.SchemaData)
  async schemaData(
    @Args('id', SchemaDataId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<SchemaData> {
    return await this.schemaDataService.schemaData(id, select);
  }

  @Query(() => [SchemaDataSelectOutput], {
    description: SchemaDataResolverName.SchemaDataSelect,
  })
  @CacheControl(SchemaDataCache.SchemaDataSelect)
  async schemaDataSelect(
    @Args() input: SchemaDataSelectInput,
    @PrismaSelect() select: BaseSelect,
  ): Promise<SchemaDataSelectOutput[]> {
    return await this.schemaDataService.schemaDataSelect(input, select);
  }
}
