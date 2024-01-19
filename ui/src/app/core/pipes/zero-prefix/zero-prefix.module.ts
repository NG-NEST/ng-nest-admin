import { NgModule } from '@angular/core';
import { AppZeroPrefixPipe } from './zero-prefix.pipe';

@NgModule({
  declarations: [AppZeroPrefixPipe],
  exports: [AppZeroPrefixPipe]
})
export class AppZeroPrefixModule {}
