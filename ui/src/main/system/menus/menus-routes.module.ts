import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './menus.component';
import { MenuActionsComponent } from './menu-actions/menu-actions.component';
import { ActionDetailComponent } from './action-detail/action-detail.component';

const routes: Routes = [
  { path: '', component: MenusComponent },
  { path: 'actions/:menuId', component: MenuActionsComponent },
  { path: 'actions/:menuId/:type', component: ActionDetailComponent },
  { path: 'actions/:menuId/:type/:id', component: ActionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutesModule {}
