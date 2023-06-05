import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/services/config.service';

/**
 * 没有权限访问的页面
 *
 * @export
 * @class NoAuthComponent
 */
@Component({
  selector: 'no-auth',
  template: ` <x-inner>抱歉，您没有权限访问此页面!</x-inner> `,
  encapsulation: ViewEncapsulation.None
})
export class NoAuthComponent implements OnInit {
  constructor(public router: Router, private config: ConfigService) {}

  ngOnInit() {
    // 删除当前的路由复用
    this.config.deleteRouteSnapshot(this.router.url);
  }
}
