import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgMoonModule } from "ng-moon";

// 模块
const modules = [FormsModule, NgMoonModule];

/**
 * 共享模块
 */
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ShareModule {}
