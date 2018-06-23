import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDetails} from '../../models/user-details';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userDetails: UserDetails;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userDetails = this.authService.getUserDetails();
  }

  signOut(){
    this.authService.logout();
  }

}
