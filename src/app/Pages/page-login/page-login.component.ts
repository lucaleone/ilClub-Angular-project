import {Component} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent {
  email: string;
  password: string;
  loginError = false;
  loginDone = false;

  constructor(private router: Router, private service: FirebaseService, public afAuth: AngularFireAuth) {
    // this.serviceUser.getEmail().subscribe(arg => console.log(arg));
    afAuth.auth.createUserWithEmailAndPassword('fsafa', 'wfsaf');
  }

  login() {
    this.service.getData('Utenti.json').subscribe(users => {
      for (const idx in users) {
        if (users[idx].email.toLowerCase() === this.email.toLowerCase() &&
            users[idx].password === this.password) {
          this.loginError = false;
          this.loginDone = true;
          localStorage.setItem('currentUser', JSON.stringify(users[idx]));
          // console.log('login effetuato con successo' + localStorage.getItem('currentUser'));
          this.router.navigateByUrl('/home');
        } else {
          this.loginError = true;
          // console.log('errore nel login');
        }
      }
    });
  }
  loginEmail() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logoutGoogle() {
    this.afAuth.auth.signOut();
  }
}
