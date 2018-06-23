import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { FacebookSigninComponent } from './facebook-signin/facebook-signin.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppRoutes } from './app.routes';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    GoogleSigninComponent,
    FacebookSigninComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    AppRoutes,
    BrowserModule,      
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    
    MaterialModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
