import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutesModule } from './organization-routes.module';
import { OrganizationComponent } from './organization.component';
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { NgNestModule } from 'src/share/ng-nest.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule,
    OrganizationRoutesModule
  ],
  declarations: [OrganizationComponent]
})
export class OrganizationModule {}
