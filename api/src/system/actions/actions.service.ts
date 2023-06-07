import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { XRepositoryService, XQuery } from '@ng-nest/api/core';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionsService extends XRepositoryService<Action, XQuery> {
  constructor(
    @InjectRepository(Action)
    private readonly entityRepository: Repository<Action>,
    private dataSource: DataSource
  ) {
    super(entityRepository, dataSource);
  }
}
