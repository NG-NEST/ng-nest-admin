import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ReuseStrategyService } from "../../services/reuse-strategy.service";

/**
 * 404异常页面
 *
 * @export
 * @class Exception404Component
 */
@Component({
  selector: "exception-404",
  template: `
    <nm-inner>404 抱歉，你访问的页面不存在!</nm-inner>
  `,
  encapsulation: ViewEncapsulation.None
})
export class Exception404Component {
  constructor(private router: Router) {
    ReuseStrategyService.deleteRouteSnapshot(this.router.url);
  }
}
