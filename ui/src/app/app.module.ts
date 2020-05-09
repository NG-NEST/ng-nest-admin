import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';
import { ShareModule } from 'src/share/share.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ShareModule, AppRoutesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
