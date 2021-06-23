import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';

@Injectable({ providedIn: 'root' })
export class ModuleDesignService extends RepositoryService<ModuleDesign> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'module-design' } });
  }
}

export interface ModuleDesign extends Id {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
}
