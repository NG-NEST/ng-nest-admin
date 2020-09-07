import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { XMessageModule } from '@ng-nest/ui/message';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { AuAuthDirective } from './auth/auth.directive';

// 视图
const declarations = [AuAuthDirective];

// 模块
const modules = [FormsModule, ReactiveFormsModule, HttpClientModule, XMessageModule, XMessageBoxModule];

/**
 * 共享模块
 */
@NgModule({
  declarations: [...declarations],
  imports: [...modules],
  exports: [...modules, ...declarations]
})
export class ShareModule {}
