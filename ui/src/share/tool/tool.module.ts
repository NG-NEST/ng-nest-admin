import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdToolComponent } from './tool.component';

/**
 * 工具栏组件
 */
@NgModule({
  declarations: [AdToolComponent],
  exports: [AdToolComponent],
  imports: [CommonModule]
})
export class AdToolModule {}
