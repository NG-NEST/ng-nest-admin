import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Like, ObjectID } from 'typeorm';
import { RepositoryService, XQuery } from '@ng-nest/api/core';
import { Menu } from './entities/menu.entity';
import { Action } from '../../system/actions/entities/action.entity';
import { filter, find, orderBy } from 'lodash';

@Injectable()
export class MenusService extends RepositoryService<Menu, XQuery> {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>
  ) {
    super(menuRepository);
  }

  async get(id: string | number | Date | ObjectID): Promise<Menu> {
    return await this.menuRepository.findOne(id, { relations: ['actions'] });
  }

  async post(entity: Menu): Promise<Menu> {
    let parent = await this.menuRepository.findOne(entity.pid);
    return await getManager().transaction<Menu>(async x => {
      entity.path = parent ? `${parent.path}.${entity.id}` : `${entity.id}`;
      let result = await this.menuRepository.save(entity);
      entity.actions.forEach(async y => await this.actionRepository.save(y));
      return result;
    });
  }

  async put(entity: Menu): Promise<Menu> {
    let menu = await this.menuRepository.findOne(entity.id, { relations: ['actions'] });
    if (menu) {
      return await getManager().transaction(async x => {
        let removeActions = filter(menu.actions, y => !find(entity.actions, z => y.id == z.id)) as Action[];
        let addActions = filter(entity.actions, y => !find(menu.actions, z => y.id == z.id)) as Action[];
        let updateActions = filter(menu.actions, y => find(entity.actions, z => y.id == z.id)) as Action[];
        if (removeActions.length > 0) await this.actionRepository.remove(removeActions);
        if (addActions.length > 0) addActions.forEach(async y => await this.actionRepository.save(y));
        if (updateActions instanceof Array)
          updateActions.forEach(async y => {
            await this.actionRepository.save(
              Object.assign(
                y,
                find(entity.actions, z => z.id == y.id)
              )
            );
          });
        Object.assign(menu, entity);
        let result = await this.menuRepository.save(menu);
        return result;
      });
    }
  }

  async delete(id: string | number | Date | ObjectID): Promise<Menu> {
    let remove = await this.menuRepository.findOne(id);
    let moves = await this.menuRepository.find({ where: { path: Like(`${remove.path}%`) } });
    moves = orderBy(moves, x => -x.path.length);
    for (let move of moves) {
      await this.menuRepository.remove(move);
    }
    return remove;
  }
}
