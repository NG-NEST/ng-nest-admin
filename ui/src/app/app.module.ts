import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgMoonModule } from "ng-moon";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgMoonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
