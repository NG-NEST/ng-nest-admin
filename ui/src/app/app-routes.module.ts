import { NgModule } from "@angular/core";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { mainRoutes } from "../environments/routes";
import { ReuseStrategyService } from "./../services/reuse-strategy.service";
import { PreloadingStrategyService } from "./../services/preloading-strategy.service";

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes, {
    enableTracing: false,
    anchorScrolling: "enabled",
    preloadingStrategy: PreloadingStrategyService,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule],
  providers: [
    PreloadingStrategyService,
    { provide: RouteReuseStrategy, useClass: ReuseStrategyService }
  ]
})
export class AppRoutesModule {}
