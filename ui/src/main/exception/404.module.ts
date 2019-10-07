import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Exception404Component } from "./404.component";
import { Exception404RoutesModule } from "./404-routes.module";
import { ShareModule } from "./../../share/share.module";

@NgModule({
  imports: [CommonModule, ShareModule, Exception404RoutesModule],
  declarations: [Exception404Component],
  exports: [Exception404Component]
})
export class Exception404Module {}
