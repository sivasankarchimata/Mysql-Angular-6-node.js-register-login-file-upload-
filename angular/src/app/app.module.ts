import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { AlertsModule } from 'angular-alert-module';
import {  FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
// import { UiModule } from './ui/ui.module';
import { LayoutComponent } from './ui/layout/layout.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';

// import { UserModule } from './user/user.module';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
// Routes
import { AppRoutingModule } from './app-routing/app-routing.module';

// Services
import { UserService } from './services/user.service';


// Services

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    AlertsModule.forRoot(),
    // UiModule
    // UserModule
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
