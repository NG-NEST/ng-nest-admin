import { HttpService } from "./http.service";
import * as _ from "lodash";

export interface Id {
    id: string | number;
}

export interface Controller {
    name: string
}

export interface RepositoryOption {
    controller: Controller
}

export interface ResultList<T> {
    list?: T[],
    count?: number;
    query?: Query;
}

export interface Query {
    index?: number;
    size?: number;
    filter?: any;
}

export class RepositoryService {

    constructor(
        public http: HttpService,
        public option: RepositoryOption
    ) { }

    findAll(query?: Query) {
        let param: Query = { index: 1, size: 10 };
        if (query) {
            param = Object.assign(param, query)
        }
        return this.http.get(`${this.option.controller.name}/${param.size}/${param.index}`, query.filter);
    }

    findOne(id) {
        return this.http.get(`${this.option.controller.name}/${id}`);
    }

    create(entity) {
        return this.http.post(`${this.option.controller.name}`, entity);
    }

    update(entity) {
        return this.http.put(`${this.option.controller.name}`, entity);
    }

    remove(id) {
        return this.http.delete(`${this.option.controller.name}/${id}`);
    }
}
