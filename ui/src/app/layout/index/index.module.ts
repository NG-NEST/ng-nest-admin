import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { AsideComponent } from './aside/aside.component';
import { TabsComponent } from './tabs/tabs.component';
import { CrumbComponent } from './crumb/crumb.component';
import { ContentComponent } from './content/content.component';
import { XMenuModule } from '@ng-nest/ui/menu';

@NgModule({
  declarations: [IndexComponent, AsideComponent, TabsComponent, CrumbComponent, ContentComponent],
  imports: [CommonModule, IndexRoutingModule, XMenuModule]
})
export class IndexModule {}
