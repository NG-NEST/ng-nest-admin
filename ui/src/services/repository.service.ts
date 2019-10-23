import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import * as _ from "lodash";

export interface Id {
  id: string | number;
}

export interface Controller {
  name: string;
}

export interface RepositoryOption {
  controller: Controller;
}

export interface ResultList<Entity extends Id> {
  list?: Entity[];
  total?: number;
  query?: Query;
}

export interface Query {
  index?: number;
  size?: number;
  filter?: any;
}

export class RepositoryService<Entity extends Id> {
  constructor(public http: HttpService, public option: RepositoryOption) {}

  getList(query?: Query): Observable<ResultList<Entity>> {
    let param: Query = { index: 1, size: 10 };
    if (query) {
      param = Object.assign(param, query);
    }
    return this.http.get(
      `${this.option.controller.name}/${param.size}/${param.index}`,
      query.filter
    );
  }

  get(id: number | string): Observable<Entity> {
    return this.http.get(`${this.option.controller.name}/${id}`);
  }

  post(entity: Entity): Observable<Entity> {
    return this.http.post(`${this.option.controller.name}`, entity);
  }

  put(entity: Entity): Observable<Entity> {
    return this.http.put(`${this.option.controller.name}`, entity);
  }

  delete(id: number | string): Observable<boolean> {
    return this.http.delete(`${this.option.controller.name}/${id}`);
  }
}
