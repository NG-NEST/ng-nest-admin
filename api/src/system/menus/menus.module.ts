import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { Action } from '../../system/actions/entities/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Action])],
  controllers: [MenusController],
  providers: [MenusService]
})
export class MenusModule {}
