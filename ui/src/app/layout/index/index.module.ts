import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { XContainerModule } from '@ng-nest/ui/container';
import { IndexRoutingModule } from './index-routing.module';
import { AsideComponent } from './aside/aside.component';
import { TabsComponent } from './tabs/tabs.component';
import { CrumbComponent } from './crumb/crumb.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [IndexComponent, AsideComponent, TabsComponent, CrumbComponent, ContentComponent],
  imports: [CommonModule, IndexRoutingModule, XContainerModule]
})
export class IndexModule {}
