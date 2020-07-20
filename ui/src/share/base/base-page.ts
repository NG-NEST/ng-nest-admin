import { IndexService } from 'src/layout/index/index.service';
import { Action, Menu } from 'src/services/auth.service';

export class PageBase {
  actions?: Action[];
  menu?: Menu;
  auth: { [code: string]: boolean } = {};

  constructor(public indexService: IndexService) {
    let menuSub$ = this.indexService.menuChange.subscribe((x) => {
      this.baseInit();
      menuSub$.unsubscribe();
    });
  }

  baseInit() {
    this.menu = this.indexService.auth.user.permissions?.menus?.find((x) => x.router == this.indexService.session.activatedPage);
    this.actions = this.indexService.auth.user.permissions?.actions?.filter((x) => x.menuId == this.menu?.id);
    this.actions?.forEach((x) => (this.auth[x.code as string] = true));
  }

  unAuth(code?: string): boolean {
    return !this.auth[code as string];
  }
}
