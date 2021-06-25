import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../entities/table.entity';
import { Col } from '../entities/col.entity';
import { XQuery, XRepositoryService } from '@ng-nest/api/core';

@Injectable()
export class TableService extends XRepositoryService<Table, XQuery> {
  constructor(
    @InjectRepository(Table)
    private readonly entityRepository: Repository<Table>,
    @InjectRepository(Col)
    private readonly colRepository: Repository<Col>
  ) {
    super(entityRepository);
  }
}
