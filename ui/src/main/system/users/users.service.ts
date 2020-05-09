import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';

@Injectable()
export class UsersService extends RepositoryService<User> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'users' } });
  }
}

export interface User extends Id {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  user: string;
}
