import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';

@Injectable({ providedIn: 'root' })
export class ModuleService extends RepositoryService<Module> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'modules' } });
  }
}

export interface Module extends Id {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
}
