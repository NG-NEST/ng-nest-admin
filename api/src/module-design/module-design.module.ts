import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as EModule } from './entities/module.entity';
import { ModuleService } from './services/module.service';
import { ModuleController } from './controllers/module.controller';
import { Page } from './entities/page.entity';
import { PageController } from './controllers/page.controller';
import { PageService } from './services/page.service';
import { Control } from './entities/control.entity';
import { TableService } from './services/table.service';
import { TableController } from './controllers/table.controller';
import { Col } from './entities/col.entity';
import { Table } from './entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EModule, Page, Control, Table, Col])],
  controllers: [ModuleController, PageController, TableController],
  providers: [ModuleService, PageService, TableService]
})
export class ModuleDesignModule {}
