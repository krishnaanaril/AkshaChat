import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backClick() {
    this.location.back();
  }

}
