import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { XCrumbNode } from '@ng-nest/ui/crumb';
import { XMenuNode } from '@ng-nest/ui/menu';
import { filter } from 'rxjs';
import { AppMenus } from 'src/app/app-menus';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  menus: XMenuNode[] = AppMenus;
  crumbs: XCrumbNode[] = [];
  menuActivatedId = '';

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.getCrumbs(event.url);
    });
  }

  getCrumbs(url: string) {
    const arr = url.split('/');
    const list: XCrumbNode[] = [];
    const setList = (route: string) => {
      let menu = this.menus.find((x) => x.routerLink === `./${route}`);
      if (menu) {
        list.push(menu);
        this.menuActivatedId = menu.id;
        while (menu && menu.pid) {
          menu = this.menus.find((x) => x.id === menu!.pid);
          if (menu) {
            list.unshift(menu);
          }
        }
      }
    };
    if (arr.length > 2) {
      setList(arr[2]);
    } else if (arr.length === 2 && arr[1] === '') {
      setList('overview');
    }

    this.crumbs = list.map((x, index) => {
      if (index > 0) {
        const { icon, ...menu } = x;
        return menu;
      } else {
        return x;
      }
    });
  }
}
