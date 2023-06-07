import { Injectable, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { XRepositoryService } from './repository.service';
import { XId, XResultList, XGroupItem, XQuery, XIdType } from '../interfaces';
import { DeleteResult } from 'typeorm';

@Injectable()
export class XControllerService<Entity extends XId, Query extends XQuery> {
  constructor(private readonly service: XRepositoryService<Entity, Query>) {}

  @Post(':size/:index')
  async getList(
    @Param('index', new ParseIntPipe()) index: number = 1,
    @Param('size', new ParseIntPipe()) size: number = 10,
    @Body() query: Query
  ): Promise<XResultList<Entity | XGroupItem>> {
    return await this.service.getList(index, size, query);
  }

  @Get(':id')
  async get(@Param('id') id: XIdType): Promise<Entity> {
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
  async delete(@Param('id') id: XIdType): Promise<Entity> {
    return await this.service.delete(id);
  }
}
