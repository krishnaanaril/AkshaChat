import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleSigninComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
