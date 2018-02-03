import {Component} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {IlClubEvent} from '../../models/il-club-event';
import {Library} from '../../models/library';
import {IlClubUser} from '../../models/ilClubUser';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css', '../../app.component.css']
})
export class PageLoginComponent {
  email: string;
  password: string;
  loginError = false;
  loginErrorMessage = '';

  constructor(private router: Router, _firebaseAuth: AngularFireAuth, public userService: AuthService, private db: AngularFireDatabase) {
    // this.serviceUser.getEmail().subscribe(arg => console.log(arg));
    _firebaseAuth.auth.getRedirectResult().then((res) => {
      if (res.user) {
        // res.additionalUserInfo.isNewUser
        console.log('res del log: ' + res);
        console.log(res);
        this.router.navigate(['/home']);
      }}).catch(err => this.displayLoginError(err));
  }

  events: AngularFireList<IlClubEvent>;
  users: AngularFireList<IlClubUser>;
  libraries: AngularFireList<Library>;

  checkLogin() {
    alert('CHECK è l"utente loggato ' + this.userService.isLoggedIn());
    /*this.events = this.db.list('/IlClubEvents');
    this.users = this.db.list('/IlClubUsers');
    this.libraries = this.db.list('/Libraries');
    const tmpUser = new IlClubUser('test@email.com');
    const userKey = this.users.push(tmpUser).key;
    console.log('key creata: ' + userKey);
    const tmpLib = new Library();
    tmpLib.address = 'via test';
    tmpLib.name = 'mylib';
    const libKey = this.libraries.push(tmpLib).key;
    const tmpEvent = new IlClubEvent();
    tmpEvent.date = '' + Date.now();
    tmpEvent.description = 'test nuovo evento';
    tmpEvent.time = '10:54';
    tmpEvent.library = libKey;
    tmpEvent.owner = userKey;
    this.events.push(tmpEvent);*/
  }

  loginEmail() {
    this.userService.signInWithEmail(this.email, this.password)
      .then((res) => {
        console.log('login succesful');
         this.router.navigate(['/home']);
      }).catch(err => this.displayLoginError(err));
  }

  signUpWithEmail() {
    this.userService.signUpWithEmail(this.email, this.password)
      .then((res) => {
        console.log('account created!');
        this.loginEmail();
      }).catch(err => this.displayLoginError(err));
  }

  loginGoogle() {
    this.userService.signInWithGoogle().then((res) => {
      console.log('login succesful');
    }).catch(err => this.displayLoginError(err.message));
  }

  signInWithFacebook() {
    this.userService.signInWithFacebook().then((res) => {
      console.log('login succesful');
    }).catch(err => this.displayLoginError(err.message));
  }

  displayLoginError(errMessage) {
    this.loginError = true;
    this.loginErrorMessage = errMessage;
  }
}
