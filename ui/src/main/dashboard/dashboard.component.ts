import { Component, ViewEncapsulation } from "@angular/core";

/**
 * 仪表盘
 *
 * @export
 * @class DashboardComponent
 */
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  value: any;
  constructor() {}
}
