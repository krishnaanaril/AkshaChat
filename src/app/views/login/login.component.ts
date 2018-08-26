import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private userService: UserService) { }

  ngOnInit() {
    window.navigator.storage.estimate().then(res => { console.log(res); });
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          this.userService.saveUser(res.user);
        }
        this.zone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          this.userService.saveUser(res.user);
        }
        this.zone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((err) => console.log(err));
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          this.userService.saveUser(res.user);
        }
        this.zone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((err) => console.log('error: ' + err));
  }
}
