import { Controller, UseGuards } from '@nestjs/common';
import { ControllerService, XQuery } from '@ng-nest/api/core';
import { Action } from './entities/action.entity';
import { ActionsService } from './actions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('actions')
// @UseGuards(AuthGuard('jwt'))
export class ActionsController extends ControllerService<Action, XQuery> {
  constructor(private readonly entityService: ActionsService) {
    super(entityService);
  }
}
