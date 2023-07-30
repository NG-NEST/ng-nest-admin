import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';

const routes: Routes = [{ path: '', component: OverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule {}
