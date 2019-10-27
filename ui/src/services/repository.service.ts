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
  sort?: string[];
  filter?: Filter[];
}

export interface Filter {
  field: string;
  value: string;
}

export class RepositoryService<Entity extends Id> {
  constructor(public http: HttpService, public option: RepositoryOption) {}

  getList(
    index?: number,
    size?: number,
    query?: Query
  ): Observable<ResultList<Entity>> {
    index = index ? index : 1;
    size = size ? size : 10;
    return this.http.get(
      `${this.option.controller.name}/${size}/${index}`,
      query,
      true
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
