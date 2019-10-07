import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IndexService } from "../index.service";

@Component({
  selector: "app-crumb",
  templateUrl: "./crumb.component.html",
  encapsulation: ViewEncapsulation.None
})
export class CrumbComponent implements OnInit {
  constructor(public indexService: IndexService) {}

  ngOnInit() {}
}
