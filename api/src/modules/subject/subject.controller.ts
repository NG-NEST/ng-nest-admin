import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateSubjectInput, UpdateSubjectInput } from '@api/dto';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from '../auth';

@UseGuards(JwtAuthGuard)
@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Put()
  async updateSubject(@Body() data: UpdateSubjectInput) {
    return await this.subjectService.updateSubject(data);
  }

  @Post()
  async createSubject(@Body() data: CreateSubjectInput) {
    return await this.subjectService.createSubject(data);
  }

  @Delete(':id')
  async deleteSubject(@Param('id') id: string) {
    return await this.subjectService.deleteSubject(id);
  }
}
