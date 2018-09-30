import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user-details';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  searchText: string;
  searchResultSet: UserDetails[];

  constructor(private location: Location,
    private userService: UserService) { }

  ngOnInit() {
  }

  backClick() {
    this.location.back();
  }

  searchUser() {
    this.searchResultSet = [];
    if (this.isTextEmail(this.searchText)) {
      this.userService.searchUser(this.searchText, true);
      this.userService.usersByMail$.subscribe((users) => {
        users.forEach((user) => {
          console.log(`User name: ${user.payload.val().displayName}`);
          this.searchResultSet.push(user.payload.val());
        });
      });
    } else {
      this.userService.searchUser(this.searchText, false);
      this.userService.usersByName$.subscribe((users) => {
        users.forEach((user) => {
          this.searchResultSet.push(user.payload.val());
          console.log(`User name: ${user.payload.val().displayName}`);
        });
      });
    }
  }

  isTextEmail(text) {
    const re = /\S+@\S+\.\S+/;
    return re.test(text);
  }

}
