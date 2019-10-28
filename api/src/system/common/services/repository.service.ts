import { Query, Filter, GroupItem } from "./../interfaces/result.interface";
import { Injectable } from "@nestjs/common";
import { Repository, getManager, ObjectID, SelectQueryBuilder } from "typeorm";
import { Id } from "../interfaces/id.interface";
import { ResultList } from "../interfaces/result.interface";
import * as _ from "lodash";

@Injectable()
export class RepositoryService<Entity extends Id> {
  constructor(private repository: Repository<Entity>) {}

  async getList(
    index: number,
    size: number,
    query: Query
  ): Promise<ResultList<Entity | GroupItem>> {
    return new Promise<ResultList<Entity | GroupItem>>(async x => {
      let qb = this.repository.createQueryBuilder("entity");
      let list: Entity[] | GroupItem[] = [];
      let total: number = 0;
      this.setFilter(qb, query.filter);
      if (query.group) {
        let group = await this.setGroup(qb, query.group);
        group = _.sortBy(group, query.sort);
        let start = size * (index - 1);
        let end = start + size;
        list = _.slice(group, start, end);
        total = group.length;
      } else {
        this.setSort(qb, query.sort);
        list = await qb
          .skip(size * (index - 1))
          .take(size)
          .getMany();
        total = await qb.getCount();
      }
      let result: ResultList<Entity | GroupItem> = {
        list: list,
        total: total,
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

  async setGroup(rep: SelectQueryBuilder<Entity>, group: string) {
    let result = [];
    if (group) {
      result = (await rep
        .groupBy(`entity.${group}`)
        .select([`entity.${group}`, `count(entity.${group}) as count`])
        .getRawMany()).map(y => {
        let mapTo = {};
        mapTo[group] = y[`entity_${group}`];
        mapTo["count"] = parseInt(y.count);
        return mapTo;
      });
    }
    return result;
  }

  setSort(rep: SelectQueryBuilder<Entity>, sort: string[]) {
    if (sort && sort.length > 0) {
      let condition = {};
      sort.forEach(x => {
        let spt = x.split(" ");
        let order: "ASC" | "DESC" =
          spt.length > 1
            ? spt[1].toUpperCase() == "DESC"
              ? "DESC"
              : "ASC"
            : "ASC";
        condition[`entity.${spt[0]}`] = order;
      });
      rep = rep.orderBy(condition);
    }
    return rep;
  }
}
