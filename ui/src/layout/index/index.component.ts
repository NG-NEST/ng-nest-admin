import {
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation
} from "@angular/core";
import { IndexService } from "./index.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  // 菜单展开缩起的样式绑定
  @HostBinding("class.sider-shrink") get siderShrink() {
    return this.indexService.local.siderShrink;
  }

  constructor(private indexService: IndexService) {}

  ngOnInit() {}
}
