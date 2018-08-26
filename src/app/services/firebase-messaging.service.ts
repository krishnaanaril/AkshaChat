import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  messaging = firebase.messaging();

  constructor() { }

  setPublicVapidKey() {
    this.messaging.usePublicVapidKey('BJOfhx4tdVnLu4sbyfVxfxqg_zm0Eem4_Ai9c5lZTElIFDnsNiXpXgUyj12mKwHOlcMfl0m3YlqWJFueY4vNInA');
  }

  getPermission() {
    this.messaging.requestPermission().then(function () {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }).catch(function (err) {
      console.log('Unable to get permission to notify.', err);
    });
  }
}
