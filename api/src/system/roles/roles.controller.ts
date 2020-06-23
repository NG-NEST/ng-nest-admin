import { Controller, UseGuards } from '@nestjs/common';
import { ControllerService } from '@ng-nest/api/core';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
@UseGuards(AuthGuard('jwt'))
export class RolesController extends ControllerService<Role> {
  constructor(rolesService: RolesService) {
    super(rolesService);
  }
}
