import { Component, OnInit } from '@angular/core';
declare var FB: any;

@Component({
  selector: 'facebook-signin',
  templateUrl: './facebook-signin.component.html',
  styleUrls: ['./facebook-signin.component.css']
})
export class FacebookSigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    FB.init({
      appId: '719110601592547',
      cookie: false,
      xfbml: true,  // parse social plugins on this page
      version: 'v3.0' // use graph api version 2.5
    });
  }

}
