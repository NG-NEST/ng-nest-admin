import { ReuseStrategyService } from "./../../../services/reuse-strategy.service";
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef,
  ElementRef
} from "@angular/core";
import { IndexService } from "../index.service";
import { NavService } from "./../../../services/nav.service";
import * as _ from "lodash";
import { NmPortalService, NmCrumbNodeClick } from "ng-moon";
import { FloatNodeComponent } from "../sider/float-node/float-node.component";
import { Overlay } from "@angular/cdk/overlay";
import { FLOAT_NODE_OPTION } from "../sider/float-node/float-node.type";

@Component({
  selector: "app-crumb",
  templateUrl: "./crumb.component.html",
  encapsulation: ViewEncapsulation.None
})
export class CrumbComponent implements OnInit {
  constructor(
    public indexService: IndexService,
    public router: Router,
    public nav: NavService,
    public portal: NmPortalService,
    public viewContainerRef: ViewContainerRef,
    public overlay: Overlay
  ) {}

  ngOnInit() {}

  nodeClick(event: NmCrumbNodeClick) {
    this.indexService.portal = this.portal.create({
      nmContent: FloatNodeComponent,
      nmViewContainerRef: this.viewContainerRef,
      nmOverlayConfig: {
        hasBackdrop: true,
        positionStrategy: this.overlay
          .position()
          .connectedTo(
            new ElementRef(event.event.srcElement),
            { originX: "start", originY: "bottom" },
            { overlayX: "start", overlayY: "top" }
          ),
        backdropClass: ""
      },
      nmInjector: this.portal.createInjector(
        this.indexService.floatChild(
          this.indexService.menus.filter(x => x.parentId === event.node.data.id)
        ),
        FLOAT_NODE_OPTION
      )
    });
    this.indexService.portal.nmOverlayRef.backdropClick().subscribe(() => {
      this.indexService.portal.nmOverlayRef.detach();
    });
  }

  reload() {
    let url = this.nav.getUrl(this.router.url);
    url.param.timestamp = new Date().getTime();
    ReuseStrategyService.deleteRouteSnapshot(url.path);
    _.remove(this.nav.history, _.first(this.nav.history));
    this.router.navigate([url.path, url.param]);
  }

  back() {
    this.nav.back();
  }

  forward() {}
}
