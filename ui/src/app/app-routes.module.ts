import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { mainRoutes } from '../environments/routes';
import { ReuseStrategyService } from './../services/reuse-strategy.service';
import { PreloadingStrategyService } from './../services/preloading-strategy.service';
import { ConfigService } from 'src/services/config.service';

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes, {
      enableTracing: false,
      anchorScrolling: 'enabled',
      preloadingStrategy: PreloadingStrategyService
    })
  ],
  exports: [RouterModule],
  providers: [
    PreloadingStrategyService, 
    { provide: RouteReuseStrategy, deps: [ConfigService], useClass: ReuseStrategyService }
  ]
})
export class AppRoutesModule {}
