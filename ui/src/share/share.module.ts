import { NgModule } from "@angular/core";
import { NgMoonModule } from "ng-moon";

// 模块
const modules = [NgMoonModule];

/**
 * 共享模块
 */
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ShareModule {}
