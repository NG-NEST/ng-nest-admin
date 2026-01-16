import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { XCrumbNode } from '@ng-nest/ui/crumb';
import { filter } from 'rxjs';
import { AppMenus } from 'src/app/app-menus';
import { XI18nService } from '@ng-nest/ui/i18n';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private router = inject(Router);
  private i18n = inject(XI18nService);
  readonly menus = signal<any[]>([]);
  readonly crumbs: WritableSignal<XCrumbNode[]> = signal([]);
  readonly menuActivatedId = signal('');

  constructor() {
    this.i18n.localeChange.subscribe(() => {
      this.setMenus();
    });
    this.setMenus();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.getCrumbs(event.url);
      });
  }

  setMenus() {
    const menus = cloneDeep(AppMenus).map((x) => {
      x.label = this.i18n.translate(x.label);
      return x;
    });
    this.menus.set(menus);
  }

  getCrumbs(url: string) {
    const arr = url.split('/');
    const list: XCrumbNode[] = [];
    const setList = (route: string) => {
      let menu = this.menus().find((x) => x.routerLink === `./${route}`);
      if (menu) {
        list.push(menu);
        this.menuActivatedId.set(menu.id);
        while (menu && menu.pid) {
          menu = this.menus().find((x) => x.id === menu!.pid);
          if (menu) {
            list.unshift(menu);
          }
        }
      }
    };
    if (arr.length > 1 && arr[1] !== '') {
      setList(arr[1]);
    } else if (arr.length === 2 && arr[1] === '') {
      setList('overview');
    }

    this.crumbs.set(
      list.map((x, index) => {
        if (index > 0) {
          const { icon, ...menu } = x;
          return menu;
        } else {
          return x;
        }
      })
    );
  }
}
