import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { AsideComponent } from './aside/aside.component';
import { TabsComponent } from './tabs/tabs.component';
import { ContentComponent } from './content/content.component';
import { XMenuModule } from '@ng-nest/ui/menu';
import { XCrumbModule } from '@ng-nest/ui/crumb';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [IndexComponent, AsideComponent, TabsComponent, ContentComponent],
  imports: [CommonModule, IndexRoutingModule, XMenuModule, XCrumbModule, XIconModule]
})
export class IndexModule {}
