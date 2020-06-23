import { Controller, UseGuards } from '@nestjs/common';
import { ControllerService } from '@ng-nest/api/core';
import { Organization } from './entities/organization.entity';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationService } from './organization.service';

@Controller('organization')
// @UseGuards(AuthGuard('jwt'))
export class OrganizationController extends ControllerService<Organization> {
  constructor(private readonly organizationService: OrganizationService) {
    super(organizationService);
  }
}
