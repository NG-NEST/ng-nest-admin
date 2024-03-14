import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { SchemaPaginationInput } from './pagination.input';
import { Schema } from './schema.model';
import { SchemaUpdateInput } from './update.input';
import { SchemaCreateInput } from './create.input';

@Injectable()
export class SchemaService {
  constructor(private prisma: PrismaService) {}

  async schemas(input: SchemaPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.schema.findMany({ ...input, ...select })) as Schema[],
      count: await this.prisma.schema.count({ where }),
    };
  }

  async schemaSelect(id: string, select: BaseSelect) {
    return await this.prisma.schema.findMany({ where: { id }, ...select });
  }

  async schema(id: string, select: BaseSelect) {
    return (await this.prisma.schema.findUnique({ where: { id }, ...select })) as Schema;
  }

  async update(input: SchemaUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.schema.update({
      data,
      where: { id },
    });
  }

  async create(data: SchemaCreateInput) {
    return await this.prisma.schema.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.schema.delete({ where: { id } });
  }
}
