import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Module } from '../entities/module.entity';
import { XQuery, XRepositoryService } from '@ng-nest/api/core';

@Injectable()
export class ModuleService extends XRepositoryService<Module, XQuery> {
  constructor(
    @InjectRepository(Module)
    private readonly entityRepository: Repository<Module>,
    private dataSource: DataSource
  ) {
    super(entityRepository, dataSource);
  }
}
