import { Component } from '@angular/core';
import { AsideComponent } from './aside/aside.component';
import { ContentComponent } from './content/content.component';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-index',
  imports: [AsideComponent, ContentComponent, TabsComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {}
