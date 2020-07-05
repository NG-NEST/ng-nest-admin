import { Controller } from '@nestjs/common';
import { ControllerService, XQuery } from '@ng-nest/api/core';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
// @UseGuards(AuthGuard('jwt'))
export class RolesController extends ControllerService<Role, XQuery> {
  constructor(rolesService: RolesService) {
    super(rolesService);
  }
}
