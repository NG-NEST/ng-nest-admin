import { Query } from './../interfaces/result.interface';
import { Injectable } from '@nestjs/common';
import { Repository, getManager, ObjectID } from 'typeorm';
import { Id } from '../interfaces/id.interface';
import { ResultList } from '../interfaces/result.interface';

@Injectable()
export class RepositoryService<Entity extends Id> {
  constructor(private repository: Repository<Entity>) {}

  async getList(
    index: number,
    size: number,
    query: Query,
  ): Promise<ResultList<Entity>> {
    return new Promise<ResultList<Entity>>(async x => {
      let result: ResultList<Entity> = {
        list: await this.repository.find({
          skip: size * (index - 1),
          take: size,
        }),
        total: await this.repository.count(),
        query: {
          index: index,
          size: size,
        },
      };
      x(result);
    });
  }

  async get(id: string | number | Date | ObjectID): Promise<Entity> {
    return await this.repository.findOne(id);
  }

  async post(entity: any): Promise<Entity> {
    return await this.repository.save(entity);
  }

  async put(entity: Entity): Promise<Entity> {
    let index = await this.repository.findOne(entity.id);
    if (index) {
      Object.assign(index, entity);
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(index);
      });

      return index;
    }
  }

  async delete(id: string | number | Date | ObjectID): Promise<Entity> {
    let entity = await this.repository.findOne(id);
    return await this.repository.remove(entity);
  }
}
