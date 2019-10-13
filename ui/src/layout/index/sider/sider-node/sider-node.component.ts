import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef,
  ElementRef,
  HostBinding,
  Input
} from "@angular/core";
import { IndexService, Menu } from "../../index.service";
import { ReuseStrategyService } from "../../../../services/reuse-strategy.service";
import * as _ from "lodash";
import { environment } from "src/environments/environment";
import { NmPortalService } from "ng-moon/portal";
import { FloatNodeComponent } from "../float-node/float-node.component";
import { Overlay } from "@angular/cdk/overlay";
import { FLOAT_NODE_OPTION } from "../float-node/float-node.type";

@Component({
  selector: "[app-sider-node]",
  templateUrl: "./sider-node.component.html",
  encapsulation: ViewEncapsulation.None
})
export class SiderNodeComponent implements OnInit {
  // 输入-菜单数据
  @Input() option: Menu = {};

  // 输入-当前层级
  @Input() level: number;

  // 输入-浮动菜单
  @Input() float: boolean = false;

  // 输出-点击节点
  // nodeEmit = new EventEmitter<object>();

  // 子节点
  child: Menu[] = [];

  @HostBinding("class.childrenShow") get childrenShow() {
    return this.option.childrenShow;
  }

  @HostBinding("class.floatShow") get floatShow() {
    return this.option.floatShow;
  }

  constructor(
    public indexService: IndexService,
    public portal: NmPortalService,
    public viewContainerRef: ViewContainerRef,
    public overlay: Overlay,
    public elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.level = this.level + 1;
    this.child = this.indexService.menus.filter(
      x => x.parentId === this.option.id
    );
    if (this.float) this.child = this.indexService.floatChild(this.child);
  }

  /**
   * 节点点击
   *
   * @param {Event} event
   * @param {any} option
   * @memberof SiderNodeComponent
   */
  toggle(event: Event, option) {
    event.stopPropagation();
    if (this.indexService.local.siderShrink && this.level == 1 && !this.float) {
      this.indexService.portal = this.portal.create({
        nmContent: FloatNodeComponent,
        nmViewContainerRef: this.viewContainerRef,
        nmOverlayConfig: {
          hasBackdrop: true,
          positionStrategy: this.overlay
            .position()
            .connectedTo(
              this.elementRef,
              { originX: "end", originY: "top" },
              { overlayX: "start", overlayY: "top" }
            ),
          backdropClass: ""
        },
        nmInjector: this.portal.createInjector(
          this.indexService.floatChild(this.child),
          FLOAT_NODE_OPTION
        )
      });
      this.indexService.floatNode = this.option;
      this.option.floatShow = true;
      this.indexService.portal.nmOverlayRef.backdropClick().subscribe(() => {
        this.option.floatShow = false;
        this.indexService.portal.nmOverlayRef.detach();
      });
    } else {
      if (this.child.length > 0) option.childrenShow = !option.childrenShow;
    }
  }

  sider(option) {
    let tab = _.find(
      this.indexService.session.tabsPage,
      x => x.router == option.router
    );
    if (tab && tab.subPage) {
      ReuseStrategyService.deleteRouteSnapshot(
        `/${environment.layout}/${option.router}`
      );
    }
    if (this.indexService.portal) {
      this.indexService.floatNode.floatShow = false;
      this.indexService.portal.nmOverlayRef.detach();
    }
  }
}
