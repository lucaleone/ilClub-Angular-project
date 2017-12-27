import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {IlClubUser} from '../models/ilClubUser';

@Injectable()
export class AuthService  {
  private _ilClubUser: Observable<IlClubUser>;
  public ilClubUser: IlClubUser = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
  }
  createIlClubAccount() {
    // download image
    // const tmpIlClubUser = new IlClubUser(this.userDetails.email, this.userDetails.displayName, null);
    // add to DB
  }

  signInWithEmail(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  signUpWithEmail(email, password) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  printIsLoggedIn() {
    this._firebaseAuth.authState.take(1).map(user => !!user).subscribe(value => console.log('User logged: ' + value));
  }

  logout() {
    this._firebaseAuth.auth.signOut().then((res) => this.router.navigate(['/login']));
  }
}
