import { Query, Filter } from "./../interfaces/result.interface";
import { Injectable } from "@nestjs/common";
import { Repository, getManager, ObjectID, SelectQueryBuilder } from "typeorm";
import { Id } from "../interfaces/id.interface";
import { ResultList } from "../interfaces/result.interface";

@Injectable()
export class RepositoryService<Entity extends Id> {
  constructor(private repository: Repository<Entity>) {}

  async getList(
    index: number,
    size: number,
    query: Query
  ): Promise<ResultList<Entity>> {
    return new Promise<ResultList<Entity>>(async x => {
      let qb = this.repository.createQueryBuilder("entity");
      this.setFilter(qb, query.filter);
      this.setSort(qb, query.sort);
      let result: ResultList<Entity> = {
        list: await qb
          .skip(size * (index - 1))
          .take(size)
          .getMany(),
        total: await qb.getCount(),
        query: query
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

  setFilter(rep: SelectQueryBuilder<Entity>, filter: Filter[]) {
    if (filter && filter.length > 0) {
      let param = {};
      filter.forEach((x, index) => {
        param[`param${index}`] = x.value;
        rep = rep.where(`entity.${x.field} = :param${index}`);
      });
      rep.setParameters(param);
    }
  }

  setSort(rep: SelectQueryBuilder<Entity>, sort: string[]) {
    if (sort && sort.length > 0) {
      sort.forEach(x => {
        let spt = x.split(" ");
        let order: "ASC" | "DESC" =
          spt.length > 1
            ? spt[1].toUpperCase() == "DESC"
              ? "DESC"
              : "ASC"
            : "ASC";
        rep = rep.orderBy(`entity.${spt[0]}`, order);
      });
    }
    return rep;
  }
}
