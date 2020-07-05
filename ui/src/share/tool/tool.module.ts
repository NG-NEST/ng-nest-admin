import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdToolComponent } from './tool.component';

@NgModule({
  declarations: [AdToolComponent],
  exports: [AdToolComponent],
  imports: [CommonModule]
})
export class AdToolModule {}
