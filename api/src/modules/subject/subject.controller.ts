import {
  CreateSubjectInput,
  Authorization,
  SubjectAuth,
  SubjectService,
  UpdateSubjectInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Patch()
  @Authorization(SubjectAuth.SubjectUpdate)
  async updateSubject(@Body() data: UpdateSubjectInput) {
    return await this.subjectService.updateSubject(data);
  }

  @Post()
  @Authorization(SubjectAuth.SubjectCreate)
  async createSubject(@Body() data: CreateSubjectInput) {
    return await this.subjectService.createSubject(data);
  }

  @Delete(':id')
  @Authorization(SubjectAuth.SubjectDelete)
  async deleteSubject(@Param('id') id: string) {
    return await this.subjectService.deleteSubject(id);
  }
}
