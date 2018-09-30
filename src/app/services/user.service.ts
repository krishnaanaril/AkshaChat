import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: AngularFireList<any>;
  usersList: Observable<any>;

  usersByMail$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  usersByName$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  emailSearch$: BehaviorSubject<string | null>;
  nameSearch$: BehaviorSubject<string | null>;

  constructor(db: AngularFireDatabase) {
    this.usersList = db.list('UserInfo').valueChanges();
    this.usersRef = db.list('UserInfo');
    // Use snapshotChanges().map() to store the key
    this.usersList = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.emailSearch$ = new BehaviorSubject(null);
    this.usersByMail$ = this.emailSearch$.pipe(
      switchMap(emailId =>
        db.list('UserInfo', ref =>
          emailId ? ref.orderByChild('email').equalTo(emailId) : ref
        ).snapshotChanges()
      )
    );

    this.nameSearch$ = new BehaviorSubject(null);
    this.usersByName$ = this.nameSearch$.pipe(
      switchMap(name =>
        db.list('UserInfo', ref =>
          name ? ref.orderByChild('displayName').equalTo(name) : ref
        ).snapshotChanges()
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
    _userDetails.phoneNumber = user.phoneNumber;
    _userDetails.email = user.email;
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

  searchUser(searchText: string, isEmail: boolean) {
    if (isEmail) {
      console.log('searching email....');
      this.emailSearch$.next(searchText);
    } else {
      console.log('searching name....');
      this.nameSearch$.next(searchText);
    }

  }

}
