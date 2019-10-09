import { Component, ViewEncapsulation } from "@angular/core";

/**
 * 首页
 *
 * @export
 * @class HomeComponent
 */
@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  value: any;
  constructor() {}
}
