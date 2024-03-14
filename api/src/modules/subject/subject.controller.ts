import {
  SubjectCreateInput,
  Authorization,
  SubjectAuth,
  SubjectService,
  SubjectUpdateInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Patch()
  @Authorization(SubjectAuth.SubjectUpdate)
  async update(@Body() data: SubjectUpdateInput) {
    return await this.subjectService.update(data);
  }

  @Post()
  @Authorization(SubjectAuth.SubjectCreate)
  async create(@Body() data: SubjectCreateInput) {
    return await this.subjectService.create(data);
  }

  @Delete(':id')
  @Authorization(SubjectAuth.SubjectDelete)
  async delete(@Param('id') id: string) {
    return await this.subjectService.delete(id);
  }
}
