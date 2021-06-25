import { Controller, UseGuards } from '@nestjs/common';
import { Page } from '../entities/page.entity';
import { PageService } from '../services/page.service';
import { AuthGuard } from '@nestjs/passport';
import { XControllerService, XQuery } from '@ng-nest/api/core';

@Controller('pages')
@UseGuards(AuthGuard('jwt'))
export class PageController extends XControllerService<Page, XQuery> {
  constructor(private readonly entityService: PageService) {
    super(entityService);
  }
}
