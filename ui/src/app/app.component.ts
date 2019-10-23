import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ng-nest-admin-ui";
  constructor(@Inject(DOCUMENT) private doc: Document) {
    let color = getComputedStyle(this.doc.documentElement).getPropertyValue(
      "--primary-color"
    );
  }
}
