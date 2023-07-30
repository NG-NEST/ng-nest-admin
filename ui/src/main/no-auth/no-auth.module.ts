import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAuthComponent } from './no-auth.component';
import { NoAuthRoutesModule } from './no-auth-routes.module';
import { ShareModule } from './../../share/share.module';
import { XInnerModule } from '@ng-nest/ui/inner';

@NgModule({
  imports: [CommonModule, ShareModule, XInnerModule, NoAuthRoutesModule],
  declarations: [NoAuthComponent],
  exports: [NoAuthComponent]
})
export class NoAuthModule {}
