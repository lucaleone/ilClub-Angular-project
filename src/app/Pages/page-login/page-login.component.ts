import {Component} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
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
  loginErrorMessage = '';

  constructor(private router: Router, private service: FirebaseService, public userService: AuthService) {
    // this.serviceUser.getEmail().subscribe(arg => console.log(arg));

  }
checkLogin() {
  console.log('CHECK è l"utente loggato ' + this.userService.printIsLoggedIn());
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
    this.userService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch(err => this.displayLoginError(err));
  }
  signInWithFacebook() {
    this.userService.signInWithFacebook()
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch(err => this.displayLoginError(err));
  }
  displayLoginError(errMessage) {
    this.loginError = true;
    this.loginErrorMessage = errMessage;
  }
}
