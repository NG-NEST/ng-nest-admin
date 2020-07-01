import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutesModule } from './organization-routes.module';
import { OrganizationComponent } from './organization.component';
import { ShareModule } from 'src/share/share.module';
import { AdToolModule } from 'src/share/tool/tool.module';
import { OrganizationService } from './organization.service';
import { XInnerModule } from '@ng-nest/ui/inner';
import { XFormModule } from '@ng-nest/ui/form';
import { XButtonModule } from '@ng-nest/ui/button';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XLinkModule } from '@ng-nest/ui/link';
import { XMessageModule } from '@ng-nest/ui/message';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    XButtonModule,
    XInnerModule,
    XFormModule,
    XTreeModule,
    XLinkModule,
    XMessageModule,
    XMessageBoxModule,
    AdToolModule,
    OrganizationRoutesModule
  ],
  declarations: [OrganizationComponent],
  exports: [OrganizationComponent],
  providers: [OrganizationService]
})
export class OrganizationModule {}
