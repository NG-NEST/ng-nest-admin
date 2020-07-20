import { Component, ViewEncapsulation } from '@angular/core';

/**
 * 仪表盘
 *
 * @export
 * @class DashboardComponent
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      app-dashboard x-card {
        margin: 0.45rem 0;
        display: block;
      }
    `
  ]
})
export class DashboardComponent {
  value: any;
  constructor() {}
}
