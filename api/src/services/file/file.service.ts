import { Injectable } from '@nestjs/common';
import { FileCreateInput } from './create.input';
import { PrismaService } from '@api/core';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async create(data: FileCreateInput) {
    return await this.prisma.file.create({ data });
  }
}
