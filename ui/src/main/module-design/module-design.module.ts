import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleDesignRoutesModule } from './module-design-routes.module';
import { ModuleDesignComponent } from './module-design.component';
import { ShareModule } from 'src/share/share.module';
import { AuToolModule } from 'src/share/tool/tool.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';
import { NgNestModule } from 'src/share/ng-nest.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule,
    ModuleDesignRoutesModule
  ],
  declarations: [ModuleDesignComponent]
})
export class ModuleDesignModule {}
