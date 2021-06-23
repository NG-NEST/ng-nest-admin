import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleDesignComponent } from './module-design.component';

const routes: Routes = [
  { path: '', component: ModuleDesignComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleDesignRoutesModule {}
