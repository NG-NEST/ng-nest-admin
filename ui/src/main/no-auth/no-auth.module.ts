import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoAuthComponent } from "./no-auth.component";
import { NoAuthRoutesModule } from "./no-auth-routes.module";
import { ShareModule } from "./../../share/share.module";

@NgModule({
  imports: [CommonModule, ShareModule, NoAuthRoutesModule],
  declarations: [NoAuthComponent],
  exports: [NoAuthComponent]
})
export class NoAuthModule {}
