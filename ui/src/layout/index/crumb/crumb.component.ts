import { ReuseStrategyService } from './../../../services/reuse-strategy.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ElementRef } from '@angular/core';
import { IndexService } from '../index.service';
import { NavService } from './../../../services/nav.service';
import * as _ from 'lodash';
import { XPortalService } from '@ng-nest/ui/portal';
import { XCrumbNodeClick } from '@ng-nest/ui/crumb';
import { FloatNodeComponent } from '../sider/float-node/float-node.component';
import { Overlay } from '@angular/cdk/overlay';
import { FLOAT_NODE_OPTION } from '../sider/float-node/float-node.type';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-crumb',
  templateUrl: './crumb.component.html',
  styleUrls: ['./crumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrumbComponent implements OnInit {
  constructor(
    public indexService: IndexService,
    public router: Router,
    public nav: NavService,
    public portal: XPortalService,
    public viewContainerRef: ViewContainerRef,
    public http: HttpClient,
    public overlay: Overlay
  ) {}

  ngOnInit() {}

  nodeClick(event: XCrumbNodeClick) {
    this.indexService.portal = this.portal.attach({
      content: FloatNodeComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        hasBackdrop: true,
        positionStrategy: this.overlay
          .position()
          .connectedTo(
            new ElementRef(event.event.srcElement),
            { originX: 'start', originY: 'bottom' },
            { overlayX: 'start', overlayY: 'top' }
          ),
        backdropClass: ''
      },
      injector: this.portal.createInjector(
        this.indexService.floatChild(this.indexService.menus.filter((x) => x.pid === event.node.data.id)),
        FLOAT_NODE_OPTION
      )
    });
    this.indexService.portal.overlayRef?.backdropClick().subscribe(() => {
      this.indexService.portal.overlayRef?.detach();
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
