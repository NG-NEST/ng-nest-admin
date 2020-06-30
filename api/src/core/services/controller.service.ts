import { Injectable, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { XId, XResultList, XGroupItem, XQuery } from '../interfaces';
import { ObjectID } from 'typeorm';

@Injectable()
export class ControllerService<Entity extends XId, Query extends XQuery> {
  constructor(private readonly service: RepositoryService<Entity, Query>) {}

  @Post(':size/:index')
  async getList(
    @Param('index', new ParseIntPipe()) index: number = 1,
    @Param('size', new ParseIntPipe()) size: number = 10,
    @Body() query: Query
  ): Promise<XResultList<Entity | XGroupItem>> {
    return await this.service.getList(index, size, query);
  }

  @Get(':id')
  async get(@Param('id') id: string | number | Date | ObjectID): Promise<Entity> {
    return await this.service.get(id);
  }

  @Post()
  async post(@Body() entity: Entity): Promise<Entity> {
    return await this.service.post(entity);
  }

  @Put()
  async put(@Body() entity: Entity): Promise<Entity> {
    return await this.service.put(entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string | number | Date | ObjectID): Promise<Entity> {
    return await this.service.delete(id);
  }
}
