import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { Organization } from '../organization/organization.service';
import { Role } from '../roles/roles.service';

@Injectable({ providedIn: 'root' })
export class UsersService extends RepositoryService<User> {
  constructor(public override http: HttpService) {
    super(http, { controller: { name: 'users' } });
  }
}

export interface User extends Id {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  organizations: Organization[];
  roles: Role[];
}
