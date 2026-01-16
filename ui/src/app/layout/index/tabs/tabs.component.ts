import { Component, computed, inject } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { AppAuthService, AppConfigService, ThemeComponent } from '@ui/core';
import { XDropdownComponent, XDropdownNode } from '@ng-nest/ui/dropdown';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XI18nPipe, XI18nService } from '@ng-nest/ui/i18n';

@Component({
  selector: 'app-tabs',
  imports: [
    XCrumbComponent,
    XIconComponent,
    XDropdownComponent,
    XButtonComponent,
    XAvatarComponent,
    XI18nPipe
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  config = inject(AppConfigService);
  auth = inject(AppAuthService);
  dialogService = inject(XDialogService);
  i18n = inject(XI18nService);
  userFirstName = computed(() => {
    const user = this.auth.userInfo();
    if (user && user.name) {
      return user.name[0];
    }
    return 'N';
  });
  userMenu = computed(() => [
    {
      id: 'exit',
      label: this.i18n.translate('$menu.exit')
    }
  ]);

  onUserMenuClick(node: XDropdownNode) {
    if (node.id === 'exit') {
      this.auth.logout().subscribe();
    }
  }

  onTheme() {
    this.dialogService.create(ThemeComponent, {
      className: 'app-theme',
      width: '48rem'
    });
  }
}
