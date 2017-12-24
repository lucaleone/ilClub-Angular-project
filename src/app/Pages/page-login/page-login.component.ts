import {Component} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService} from '../../Services/auth.service';

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

  constructor(private router: Router, private service: FirebaseService, public authService: AuthService) {
    // this.serviceUser.getEmail().subscribe(arg => console.log(arg));
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
    this.authService.signInWithEmail(this.email, this.password)
      .then((res) => {
        console.log('login succesful');
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  }
  signUpWithEmail() {
    this.authService.signUpWithEmail(this.email, this.password)
      .then((res) => {
        console.log('account creato!');
        // console.log(res);
      }).catch((err) => {
        alert(err.message);
        console.log(err);
      });
  }
  loginGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch((err) => console.log(err));
  }
  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch((err) => console.log(err));
  }
}
