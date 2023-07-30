import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, OverviewRoutingModule]
})
export class OverviewModule {}
