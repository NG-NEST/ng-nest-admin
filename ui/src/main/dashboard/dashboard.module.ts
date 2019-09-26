import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutesModule } from "./dashboard-routes.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  imports: [CommonModule, DashboardRoutesModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
