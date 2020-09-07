import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutesModule } from './home-routes.module';
import { HomeComponent } from './home.component';
import { ShareModule } from 'src/share/share.module';
import { NgNestModule } from 'src/share/ng-nest.module';
import { AuAdaptionModule } from 'src/share/adaption/adaption.module';

@NgModule({
  imports: [CommonModule, ShareModule, NgNestModule, AuAdaptionModule, HomeRoutesModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
