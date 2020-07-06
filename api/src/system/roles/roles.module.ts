import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Action } from '../actions/entities/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Action])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
