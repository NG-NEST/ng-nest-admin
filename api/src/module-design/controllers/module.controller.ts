import { Controller, UseGuards } from '@nestjs/common';
import { Module } from '../entities/module.entity';
import { ModuleService } from '../services/module.service';
import { AuthGuard } from '@nestjs/passport';
import { XControllerService, XQuery } from '@ng-nest/api/core';

@Controller('modules')
@UseGuards(AuthGuard('jwt'))
export class ModuleController extends XControllerService<Module, XQuery> {
  constructor(private readonly entityService: ModuleService) {
    super(entityService);
  }
}
