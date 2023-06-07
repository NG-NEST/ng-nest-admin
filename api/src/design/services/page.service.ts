import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Page } from '../entities/page.entity';
import { Control } from '../entities/control.entity';
import { XRepositoryService, XQuery } from '@ng-nest/api/core';

@Injectable()
export class PageService extends XRepositoryService<Page, XQuery> {
  constructor(
    @InjectRepository(Page)
    private readonly entityRepository: Repository<Page>,
    @InjectRepository(Control)
    private readonly controlRepository: Repository<Control>,
    private dataSource: DataSource
  ) {
    super(entityRepository, dataSource);
  }
}
