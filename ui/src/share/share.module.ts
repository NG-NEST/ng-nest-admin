import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 模块
const modules = [FormsModule, ReactiveFormsModule, HttpClientModule];

/**
 * 共享模块
 */
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ShareModule {}
