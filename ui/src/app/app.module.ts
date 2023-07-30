import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppAuthService, AppInitializer } from '@ui/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [AppAuthService],
      useFactory: AppInitializer,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
