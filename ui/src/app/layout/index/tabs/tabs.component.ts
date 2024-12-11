import { Component, computed } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { AppAuthService, AppConfigService } from '@ui/core';
import { XDropdownComponent, XDropdownNode } from '@ng-nest/ui/dropdown';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XAvatarComponent } from '@ng-nest/ui/avatar';

@Component({
    selector: 'app-tabs',
    imports: [
        XCrumbComponent,
        XIconComponent,
        XDropdownComponent,
        XButtonComponent,
        XAvatarComponent
    ],
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  userFirstName = computed(() => {
    const user = this.auth.userInfo();
    if (user && user.name) {
      return user.name[0];
    }
    return 'N';
  });
  userMenu: XDropdownNode[] = [
    {
      id: 'exit',
      label: '退出'
    }
  ];
  constructor(
    public config: AppConfigService,
    public auth: AppAuthService
  ) {}

  onUserMenuClick(node: XDropdownNode) {
    if (node.id === 'exit') {
      this.auth.logout().subscribe();
    }
  }
}
