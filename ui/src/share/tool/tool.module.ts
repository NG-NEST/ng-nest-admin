import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuToolComponent } from './tool.component';

@NgModule({
  declarations: [AuToolComponent],
  exports: [AuToolComponent],
  imports: [CommonModule]
})
export class AuToolModule {}
