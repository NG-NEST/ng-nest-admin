import { Injectable } from '@angular/core';
import { RepositoryService } from 'src/services/repository.service';
import { HttpService } from 'src/services/http.service';
import { XTreeNode } from '@ng-nest/ui/tree';

@Injectable()
export class MenusService extends RepositoryService<Menus> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'menus' } });
  }
}

export interface Menus extends XTreeNode {
  label?: string;
  type?: string;
  icon?: string;
  pid?: string;
  path?: string;
}
