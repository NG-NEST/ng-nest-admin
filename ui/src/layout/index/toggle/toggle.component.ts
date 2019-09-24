import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IndexService } from "../index.service";

@Component({
  selector: "app-toggle",
  templateUrl: "./toggle.component.html",
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit {
  constructor(public indexService: IndexService) {}

  ngOnInit() {}

  /**
   * 展开，缩起点击
   *
   * @memberof ToggleComponent
   */
  toggle() {
    this.indexService.local = {
      siderShrink: !this.indexService.local.siderShrink
    };
  }
}
