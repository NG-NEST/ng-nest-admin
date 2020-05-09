import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from './../../share/share.module';
import { XInnerModule } from '@ng-nest/ui/inner';
import { XInputModule } from '@ng-nest/ui/input';

@NgModule({
  imports: [CommonModule, ShareModule, DashboardRoutesModule, XInnerModule, XInputModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
