import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { CataloguePaginationInput } from './pagination.input';
import { Catalogue } from './catalogue.model';
import { CatalogueUpdateInput } from './update.input';
import { CatalogueCreateInput } from './create.input';
import { CatalogueSelectInput } from './select.input';
import { CataloguePaginationOutput } from './catalogue.output';

@Injectable()
export class CatalogueService {
  constructor(private prisma: PrismaService) {}

  async catalogues(
    input: CataloguePaginationInput,
    select: BaseSelect,
  ): Promise<CataloguePaginationOutput> {
    const { where } = input;
    return {
      data: (await this.prisma.catalogue.findMany({ ...input, ...select })) as Catalogue[],
      count: await this.prisma.catalogue.count({ where }),
    };
  }

  async catalogueSelect(input: CatalogueSelectInput, select: BaseSelect) {
    return (await this.prisma.catalogue.findMany({ ...input, ...select })) as Catalogue[];
  }

  async catalogue(id: string, select: BaseSelect) {
    return (await this.prisma.catalogue.findUnique({ where: { id }, ...select })) as Catalogue;
  }

  async update(input: CatalogueUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.catalogue.update({
      data,
      where: { id },
    });
  }

  async create(input: CatalogueCreateInput) {
    const { resourceId, pid, ...other } = input;
    const data = { ...other, resource: { connect: { id: resourceId } }, parent: {} };
    if (pid) {
      data.parent = { connect: { id: pid } };
    }
    return await this.prisma.catalogue.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.catalogue.delete({ where: { id } });
  }
}
