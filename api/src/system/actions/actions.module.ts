import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from './entities/action.entity';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Action])
    ],
    controllers: [ActionsController],
    providers: [ActionsService]
})
export class ActionsModule { }
