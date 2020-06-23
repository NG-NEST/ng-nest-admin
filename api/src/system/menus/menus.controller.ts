import { Controller, UseGuards } from '@nestjs/common';
import { ControllerService } from '@ng-nest/api/core';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('menus')
// @UseGuards(AuthGuard('jwt'))
export class MenusController extends ControllerService<Menu> {
  constructor(private readonly menusService: MenusService) {
    super(menusService);
  }
}
