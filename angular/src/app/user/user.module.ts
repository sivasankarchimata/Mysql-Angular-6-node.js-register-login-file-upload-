import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  imports: [
    CommonModule, UiModule
  ],
  declarations: [ HomeComponent, LoginComponent, RegisterComponent, ProfileComponent ],
  exports: [ HomeComponent, LoginComponent, RegisterComponent, ProfileComponent ]
})
export class UserModule { }
