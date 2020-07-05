import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { Organization } from '../organization/organization.service';

@Injectable()
export class RolesService extends RepositoryService<Role> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'roles' } });
  }
}

export interface Role extends Id {
  name: string;
  organization: Organization;
}
