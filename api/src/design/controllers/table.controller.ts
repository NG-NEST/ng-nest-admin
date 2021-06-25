import { Controller, UseGuards } from '@nestjs/common';
import { Table } from '../entities/table.entity';
import { TableService } from '../services/table.service';
import { AuthGuard } from '@nestjs/passport';
import { XQuery } from 'src/core/interfaces';
import { XControllerService } from '@ng-nest/api/core';

@Controller('tables')
@UseGuards(AuthGuard('jwt'))
export class TableController extends XControllerService<Table, XQuery> {
  constructor(private readonly entityService: TableService) {
    super(entityService);
  }
}
