import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  Schema,
  SchemaCache,
  SchemaId,
  SchemaPaginationInput,
  SchemaPaginationOutput,
  SchemaResolverName,
  SchemaSelectOutput,
  SchemaService,
  SubjectId,
} from '@api/services';

@Resolver(() => Schema)
export class SchemaResolver {
  constructor(private schemaService: SchemaService) {}

  @Query(() => SchemaPaginationOutput, {
    description: SchemaResolverName.Schemas,
  })
  @CacheControl(SchemaCache.Schemas)
  async schemas(
    @Args() input: SchemaPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<SchemaPaginationOutput> {
    return await this.schemaService.schemas(input, select);
  }

  @Query(() => Schema, { description: SchemaResolverName.Schema })
  @CacheControl(SchemaCache.Schema)
  async schema(
    @Args('id', SchemaId) id: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<Schema> {
    return await this.schemaService.schema(id, select);
  }

  @Query(() => [SchemaSelectOutput], {
    description: SchemaResolverName.SchemaSelect,
  })
  @CacheControl(SchemaCache.SchemaSelect)
  async schemaSelect(
    @Args('subjectId', SubjectId) subjectId: string,
    @PrismaSelect() select: BaseSelect,
  ): Promise<SchemaSelectOutput[]> {
    return await this.schemaService.schemaSelect(subjectId, select);
  }
}
