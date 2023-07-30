import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';

@NgModule({
  imports: [CommonModule, ShareModule, NgNestModule, AuAdaptionModule, DashboardRoutesModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
