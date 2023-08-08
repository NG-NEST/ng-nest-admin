import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppAuthService, AppInitializer, AppNoopInterceptor } from '@ui/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, GraphQLModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppNoopInterceptor, multi: true },
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
