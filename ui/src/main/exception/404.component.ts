import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ReuseStrategyService } from '../../services/reuse-strategy.service';

/**
 * 404异常页面
 *
 * @export
 * @class Exception404Component
 */
@Component({
  selector: 'exception-404',
  template: `
    <x-inner>
      <x-result status="404" title="404" sub-title="抱歉，您访问的页面不存在。"></x-result>
    </x-inner>
  `,
  encapsulation: ViewEncapsulation.None
})
export class Exception404Component {
  constructor(private router: Router) {
    ReuseStrategyService.deleteRouteSnapshot(this.router.url);
  }
}
