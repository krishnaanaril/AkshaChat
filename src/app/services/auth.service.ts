import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithFacebook() {    
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {    
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      try {
        const userKey = Object.keys(window.localStorage)
        .filter(it => it.startsWith('firebase:authUser'))[0];
        this.userDetails = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;
        /*
          In Chrome data is stored in indexeddb instead of localstorage 
          need to handle it.
         */        
      } catch (error) {
        console.log(error);
      }
    }
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  getUserDetails() {
    let _userDetails: UserDetails = new UserDetails();
    _userDetails.displayName = this.userDetails.displayName;
    _userDetails.photoURL = this.userDetails.photoURL;
    _userDetails.providerId = this.userDetails.providerData? this.userDetails.providerData[0].providerId : undefined;
    if (this.userDetails.providerData && this.userDetails.providerData[0].providerId.includes('facebook'))
      _userDetails.photoURL += "?width=9999";
    return _userDetails;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
