import { CacheClear } from '@api/core';
import {
  SubjectCreateInput,
  Authorization,
  SubjectAuth,
  SubjectService,
  SubjectUpdateInput,
  SubjectCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Patch()
  @Authorization(SubjectAuth.SubjectUpdate)
  @CacheClear(...SubjectCacheClear)
  async update(@Body() data: SubjectUpdateInput) {
    return await this.subjectService.update(data);
  }

  @Post()
  @Authorization(SubjectAuth.SubjectCreate)
  @CacheClear(...SubjectCacheClear)
  async create(@Body() data: SubjectCreateInput) {
    return await this.subjectService.create(data);
  }

  @Delete(':id')
  @Authorization(SubjectAuth.SubjectDelete)
  @CacheClear(...SubjectCacheClear)
  async delete(@Param('id') id: string) {
    return await this.subjectService.delete(id);
  }
}
