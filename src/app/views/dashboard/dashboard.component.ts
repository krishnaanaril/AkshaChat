import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { UserDetails } from '../../models/user-details';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  public userDetails: UserDetails;
  // public users: AngularFireList<UserDetails[]>;
  item: Observable<any>;

  constructor(private authService: AuthService
    , private router: Router
    , db: AngularFireDatabase) {
    // this.users = db.list('/Users');
    this.item = db.object('Users').valueChanges();
  }

  ngOnInit() {
    this.userDetails = this.authService.getUserDetails();
  }

  signOut() {
    this.authService.logout();
  }

}
