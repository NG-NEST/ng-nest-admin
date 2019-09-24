import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutesModule } from './login-routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutesModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
