import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.itemRef = db.object('Users');
    this.item = this.itemRef.valueChanges();
  }

  checkUserExists(userId: string) {
    return false;
  }

  saveUser(userDetails: UserDetails) {
    try {
      console.log('In saveUser...');
      this.itemRef.set(userDetails);
    } catch (error) {
      console.log(error);
    }
  }

}
