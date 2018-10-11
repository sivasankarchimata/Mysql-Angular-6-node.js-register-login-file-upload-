import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
 // import { UserModule } from '../user/user.module';

import { RegisterComponent } from '../user/register/register.component';
import { LoginComponent } from '../user/login/login.component';
import { HomeComponent } from '../user/home/home.component';
import { ProfileComponent } from '../user/profile/profile.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent  }
  // canActivate: [AuthGuard]
];

@NgModule({
  imports: [
    CommonModule,
    // UserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }


