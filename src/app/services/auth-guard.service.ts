import { Injectable } from '@angular/core';
import {
  Router, CanActivate,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private _firebaseAuth: AngularFireAuth) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._firebaseAuth.authState.pipe(
      take(1),
      map((authState) => !!authState),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
