import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading
} from '@angular/router';
import { LayoutRoutes } from './app-routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { XPreloadingStrategyService, X_CONFIG } from '@ng-nest/ui/core';
import { AppInitializer, AppNoopInterceptor } from '@ui/core';
import { NgNestConfig } from './ng-nest.config';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { CreateApollo } from './graphql.config';
import { HttpLink } from 'apollo-angular/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([AppNoopInterceptor])),
    provideRouter(
      LayoutRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' }),
      withEnabledBlockingInitialNavigation(),
      withPreloading(XPreloadingStrategyService)
    ),
    // provideClientHydration(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializer,
      multi: true
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: CreateApollo,
      deps: [HttpLink]
    },
    { provide: X_CONFIG, useValue: NgNestConfig },
    Apollo
  ]
};
