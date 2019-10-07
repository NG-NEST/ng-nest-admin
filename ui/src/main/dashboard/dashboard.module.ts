import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutesModule } from "./dashboard-routes.module";
import { DashboardComponent } from "./dashboard.component";
import { ShareModule } from "./../../share/share.module";

@NgModule({
  imports: [CommonModule, ShareModule, DashboardRoutesModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
