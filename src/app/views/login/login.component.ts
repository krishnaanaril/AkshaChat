import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
  }

  signInWithFacebook() {
    console.log('In signInWithFacebook');
    this.authService.signInWithFacebook()
      .then((res) => {
        this.zone.run(() => {
          this.router.navigate(['dashboard'])
        });
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    console.log('In signInWithGoogle');
    this.authService.signInWithGoogle()
      .then((res) => {
        //need to know why zone.run is required here.
        this.zone.run(() => {
          this.router.navigate(['dashboard'])
        });
      })
      .catch((err) => console.log(err));
  }

  signInWithEmail() {

    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
        this.zone.run(() => {
          this.router.navigate(['dashboard'])
        });
      })
      .catch((err) => console.log('error: ' + err));
  }
}
