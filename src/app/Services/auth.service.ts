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
  public tmpUser;
  public userAuthenticated = false;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    _firebaseAuth.auth.onAuthStateChanged((user) => {
      this.tmpUser = user;
      this.userAuthenticated = !!user;
    });
    // _firebaseAuth.authState.take(1).map(user => !!user).subscribe(value => {
    //   console.log('OOOOOOOOOOOOOOO User logged: ' + value);
    //   this.userAuthenticated = value;
    // });
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
    return this._firebaseAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  isLoggedIn(): boolean {
    // this._firebaseAuth.authState.take(1).map(user => !!user).subscribe(value => console.log('isLoggedIn(): ' + value));
    return this.userAuthenticated;
  }

  logout() {
    this._firebaseAuth.auth.signOut().then((res) => this.router.navigate(['/login']));
  }
}
