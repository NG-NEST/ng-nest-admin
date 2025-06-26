import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { SchemaDataPaginationInput } from './pagination.input';
import { SchemaData } from './schema-data.model';
import { SchemaDataUpdateInput } from './update.input';
import { SchemaDataCreateInput } from './create.input';
import { SchemaDataSelectInput } from './select.input';
import { SchemaDataPaginationOutput } from './schema-data.output';

@Injectable()
export class SchemaDataService {
  constructor(private prisma: PrismaService) {}

  RESOURCE_FILE_TYPE = 'file-type';
  RESOURCE_MEDIA_TYPE = 'media';
  RESOURCE_TEXT_TYPE = 'text';

  async schemaDatas(
    input: SchemaDataPaginationInput,
    select: BaseSelect,
  ): Promise<SchemaDataPaginationOutput> {
    const { where } = input;
    return {
      data: (await this.prisma.schemaData.findMany({
        ...input,
        ...select,
      })) as SchemaData[],
      count: await this.prisma.schemaData.count({ where }),
    };
  }

  async schemaDataSelect(input: SchemaDataSelectInput, select: BaseSelect) {
    return (await this.prisma.schemaData.findMany({
      ...input,
      ...select,
    })) as SchemaData[];
  }

  async schemaData(id: string, select: BaseSelect) {
    return (await this.prisma.schemaData.findUnique({
      where: { id },
      ...select,
    })) as SchemaData;
  }

  async update(input: SchemaDataUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.schemaData.update({
      data,
      where: { id },
    });
  }

  async create(input: SchemaDataCreateInput) {
    let { schemaId, ...other } = input;
    const data = { ...other, schema: { connect: { id: schemaId } } };
    return await this.prisma.schemaData.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.schemaData.delete({ where: { id } });
  }
}
