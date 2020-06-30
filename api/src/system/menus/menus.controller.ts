import { Controller, UseGuards } from '@nestjs/common';
import { ControllerService, XQuery } from '@ng-nest/api/core';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('menus')
// @UseGuards(AuthGuard('jwt'))
export class MenusController extends ControllerService<Menu, XQuery> {
  constructor(private readonly menusService: MenusService) {
    super(menusService);
  }
}
