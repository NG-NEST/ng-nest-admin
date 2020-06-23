import { Injectable } from '@angular/core';
import { RepositoryService, Id } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';

@Injectable()
export class OrganizationService extends RepositoryService<Organization> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'organization' } });
  }
}

export interface Organization extends Id {
  label?: string;
  type?: string;
  icon?: string;
  pid?: string;
  path?: string;
}
