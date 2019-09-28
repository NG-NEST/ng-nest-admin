import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutesModule } from "./home-routes.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [CommonModule, HomeRoutesModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
