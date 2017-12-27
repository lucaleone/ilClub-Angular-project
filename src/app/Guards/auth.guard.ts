import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _firebaseAuth: AngularFireAuth) {
  }
  canActivate(): Observable<boolean> | boolean {
    return this._firebaseAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      });
  }
}
