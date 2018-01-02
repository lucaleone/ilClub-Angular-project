import {Component, OnInit} from '@angular/core';
import { EventsHandler } from '../Services/eventsHandler.service';
import {AuthService} from '../Services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SideMenuComponent implements OnInit {
  isMenuOpen: boolean;
  public userDetails: firebase.User = null;

  constructor(private appService: EventsHandler, public authService: AuthService) {
    this.isMenuOpen = false;
    // close menu on landscape
    window.addEventListener('orientationchange', () => {
      if (Math.abs(Number(window.orientation)) === 90) {
        this.close();
      }}, false);
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 700) {
        this.close();
      }}, false);
  }

  ngOnInit() {
    this.getIsMenuOpen();
  }
  close() {
    this.appService.setIsMenuOpen(false);
  }
  getIsMenuOpen(): void {
    this.appService.getIsMenuOpen().subscribe(isMenuOpen => {
      this.isMenuOpen = isMenuOpen;
    });
  }

  logout() {
    this.authService.logout();
    this.close();
  }
}
