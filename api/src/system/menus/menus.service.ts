import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Like, ObjectID } from 'typeorm';
import { XRepositoryService, XQuery, XIdType } from '@ng-nest/api/core';
import { Menu } from './entities/menu.entity';
import { Action } from '../../system/actions/entities/action.entity';
import { filter, find, orderBy } from 'lodash';

@Injectable()
export class MenusService extends XRepositoryService<Menu, XQuery> {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>
  ) {
    super(menuRepository);
  }

  async get(id: XIdType): Promise<Menu> {
    return await this.menuRepository.findOne({ id });
  }

  async post(entity: Menu): Promise<Menu> {
    let parent = null;
    if (entity.pid !== null) parent = await this.menuRepository.findOne({ pid: entity.pid });
    return await getManager().transaction<Menu>(async x => {
      entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`;
      let result = await this.menuRepository.save(entity);
      return result;
    });
  }

  async put(entity: Menu): Promise<Menu> {
    let menu = await this.menuRepository.findOne({ where: { id: entity.id }, relations: ['actions'] });
    if (menu) {
      return await getManager().transaction(async x => {
        Object.assign(menu, entity);
        let result = await this.menuRepository.save(menu);
        return result;
      });
    }
  }

  async delete(id: XIdType): Promise<Menu> {
    let remove = await this.menuRepository.findOne({ id });
    let moves = await this.menuRepository.find({ where: { path: Like(`${remove.path}%`) } });
    moves = orderBy(moves, x => -x.path.length);
    for (let move of moves) {
      await this.menuRepository.remove(move);
    }
    return remove;
  }
}
