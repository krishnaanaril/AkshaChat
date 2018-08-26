import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: AngularFireList<any>;
  usersList: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.usersList = db.list('UserInfo').valueChanges();
    this.usersRef = db.list('UserInfo');
    // Use snapshotChanges().map() to store the key
    this.usersList = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  checkUserExists(userId: string) {
    return false;
  }

  getUserDetails(user: firebase.User) {
    let _userDetails: UserDetails;
    _userDetails = new UserDetails();
    _userDetails.displayName = user.displayName;
    _userDetails.photoURL = user.photoURL;
    _userDetails.providerId = user.providerData ? user.providerData[0].providerId : undefined;
    if (user.providerData && user.providerData[0].providerId.includes('facebook')) {
      _userDetails.photoURL += '?width=9999';
    }
    _userDetails.uid = user.uid;
    _userDetails.phoneNumber =  user.phoneNumber;
    return _userDetails;
  }

  saveUser(user: firebase.User) {
    try {
      console.log('In saveUser...');
      const userDetails: UserDetails = this.getUserDetails(user);
      this.usersRef.push(userDetails);
    } catch (error) {
      console.log(error);
    }
  }

}
