import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Inject
} from "@angular/core";
import * as _ from "lodash";
import { FLOAT_NODE_OPTION } from "./float-node.type";
import { Menu } from "../../index.service";

@Component({
  selector: "app-float-node",
  templateUrl: "./float-node.component.html",
  encapsulation: ViewEncapsulation.None
})
export class FloatNodeComponent implements OnInit {
  // 输出参数-节点点击
  nodeEmit = new EventEmitter<object>();

  // 层级
  level: number = 0;

  constructor(@Inject(FLOAT_NODE_OPTION) public option: Menu[] = []) {}

  ngOnInit() {}
}
