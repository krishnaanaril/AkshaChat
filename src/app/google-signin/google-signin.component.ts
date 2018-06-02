import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent implements OnInit, AfterViewInit {

  constructor() {
    //TODO
  }

  ngOnInit() {
    //TODO
  }  

  renderButton() {
    gapi.signin2.render('googleBtn', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }

  onSuccess(googleUser) {    
    let profile = googleUser.getBasicProfile();
    console.log('Token || ' + googleUser.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    //YOUR CODE HERE
  }
  
  onFailure(error) {
    console.log(error);
  } 

  ngAfterViewInit() {
    console.log('In ngAfterViewInit');    
    this.renderButton();
  }

}
