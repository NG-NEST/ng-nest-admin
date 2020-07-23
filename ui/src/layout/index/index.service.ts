import { Injectable, Component } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { AuthService, Menu as AuthMenu } from '../../services/auth.service';
import { NavService } from 'src/services/nav.service';
import { XCrumbNode } from '@ng-nest/ui/crumb';
import { XPortalOverlayRef } from '@ng-nest/ui/portal';
import { FloatNodeComponent } from './sider/float-node/float-node.component';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IndexService {
  componentRefs: Component[] = [];

  // 当前存储关键字
  key: string = 'Index';

  // 面包屑数据
  crumbData: XCrumbNode[] = [];

  // 弹出菜单的节点
  floatNode: Menu;

  // 弹出菜单
  portal: XPortalOverlayRef<FloatNodeComponent>;

  // 当前菜单改变事件
  menuChange = new Subject<{ previous: string; current: string }>();

  // 菜单数据
  public get menus(): Menu[] {
    return this.auth.user.permissions?.menus as Menu[];
  }

  // 本地长期存储
  private _local: Local;

  // 当前会话存储
  private _session: Session;

  constructor(
    public auth: AuthService,
    public settings: SettingService,
    public router: Router,
    public nav: NavService,
    public activtedRouter: ActivatedRoute
  ) {
    this.listenerRouter();
  }

  get local(): Local {
    if (!this._local) {
      this._local = Object.assign(
        <Local>{
          siderShrink: false,
          defaultPage: environment.defaultPage
        },
        this.settings.getLocal(this.key)
      );
      this.settings.setLocal(this.key, this._local);
    }
    return this._local;
  }

  set local(value: Local) {
    this._local = Object.assign(
      this._local
        ? this._local
        : <Local>{
            siderShrink: false,
            defaultPage: environment.defaultPage
          },
      value
    );
    this.settings.setLocal(this.key, this._local);
  }

  get session(): Session {
    if (!this._session) {
      this._session = Object.assign(
        <Session>{
          activatedPage: environment.defaultPage,
          tabsPage: []
        },
        this.settings.getSession(this.key)
      );
      this.settings.setSession(this.key, this._session);
    }
    return this._session;
  }

  set session(value: Session) {
    this._session = Object.assign(
      this._session
        ? this._session
        : <Session>{
            activatedPage: environment.defaultPage,
            tabsPage: []
          },
      value
    );
    this.settings.setSession(this.key, this._session);
  }

  /**
   * 移除本地长期存储
   *
   * @memberof LayoutService
   */
  removeLocal() {
    this.settings.removeLocal(this.key);
  }

  /**
   * 移除当前会话存储
   *
   * @memberof LayoutService
   */
  removeSession() {
    this.settings.removeSession(this.key);
  }

  /**
   * 二级路由跳转
   *
   * @param {Menu} tab
   * @memberof LayoutService
   */
  push(tab: Menu, activtedRouter: ActivatedRoute) {
    return new Promise((x, y) => {
      if (!tab.router) y('路由页面不存在!');
      this.router
        .navigate([`${tab.router}`], { relativeTo: activtedRouter })
        .then((z) => {
          // this.session = { activatedPage: tab.page };
          // let tabs = _.filter(this.session.tabsPage, x => x.page == tab.page);
          // if (tabs.length === 0) {
          //     this.session.tabsPage.unshift(tab)
          // }
          x(z);
        })
        .catch((z) => {
          y(z);
        });
    });
  }

  /**
   * 路由变化监听
   *
   * @memberof LayoutService
   */
  listenerRouter() {
    this.removeSession();
    this.router.events.pipe(filter((x) => x instanceof NavigationEnd)).subscribe((x: NavigationEnd) => {
      this.setTabs();
      this.setCrumb();
    });
  }

  /**
   * 标签页处理
   *
   * @memberof LayoutService
   */
  setTabs() {
    let url = this.nav.getUrl(this.router.url);
    let routers = url.path.split('/');
    if (routers.length > 2) {
      let router = routers[2];
      let subPage = routers.length > 3 ? _.drop(routers, 3).join('/') : undefined;
      let param = url.param;
      let menu = _.find(this.menus, (x) => x.router == router) as Menu;
      if (menu) {
        let tabsPage = this.session.tabsPage as Menu[];
        let tab = _.find(tabsPage, (x) => x.router == menu.router);
        if (tab) {
          tab.subPage = subPage;
          tab.param = param;
        } else {
          menu.subPage = subPage;
          menu.param = param;
          tabsPage.push(menu);
        }
        const previous = this.session.activatedPage;
        this.session = {
          activatedPage: router,
          subPage: subPage,
          param: param,
          tabsPage: tabsPage
        };
        this.session.tabsPage = [...(this.session.tabsPage as Menu[])];
        this.menuChange.next({ previous: previous as string, current: router });
      }
    }
  }

  /**
   * 面包屑处理
   *
   * @memberof LayoutService
   */
  setCrumb() {
    let menu = _.find(this.menus, (x) => x.router === this.session.activatedPage);
    let crumbs: XCrumbNode[] = [];
    let addParent = (item: Menu) => {
      if (item.pid === null && item.pid === '') return;
      let parent = _.find(this.menus, (x) => x.id === item.pid);
      if (parent) {
        crumbs.unshift({
          id: parent.id,
          label: parent.label,
          data: parent
        });
        addParent(parent);
      }
    };
    if (menu) {
      crumbs.push({ id: menu.id, label: menu.label, data: menu });
      addParent(menu);
    }
    this.crumbData = crumbs;
  }

  floatChild(child: Menu[]) {
    return _.map(_.cloneDeep(child), (x) => {
      x.router = x.router != null ? `./${environment.layout}/${x.router}` : x.router;
      return x;
    });
  }
}

/**
 * 本地长期
 *
 * @export
 * @interface Local
 */
export interface Local {
  /** 是否折叠右边菜单 */
  siderShrink?: boolean;
  /** 默认首页 */
  defaultPage?: string;
}

/**
 * 当前会话
 *
 * @export
 * @interface Session
 */
export interface Session {
  // 当前激活的页面
  activatedPage?: string;
  // 当前激活页面的子页面
  subPage?: string;
  // 当前激活页面的参数
  param?: { [property: string]: any };
  // 标签页数据
  tabsPage?: Menu[];
}

/**
 * 菜单数据
 *
 * @export
 * @interface Menu
 */
export interface Menu extends AuthMenu {
  // 子路由页面
  subPage?: string;
  // 参数
  param?: { [property: string]: any };
}
