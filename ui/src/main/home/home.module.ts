import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutesModule } from "./home-routes.module";
import { HomeComponent } from "./home.component";
import { ShareModule } from "./../../share/share.module";

@NgModule({
  imports: [CommonModule, ShareModule, HomeRoutesModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
