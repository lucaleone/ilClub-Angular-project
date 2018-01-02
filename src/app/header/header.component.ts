import {Component, OnInit} from '@angular/core';
import {EventsHandler} from '../Services/eventsHandler.service';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean;

  constructor(private appService: EventsHandler, public authService: AuthService) {
    this.isMenuOpen = false;
  }

  ngOnInit() {
    // this.serviceUser.setEmail(this.userEmail);
    this.appService.getIsMenuOpen().subscribe(isMenuOpen => {
      this.isMenuOpen = isMenuOpen;
    });
  }
  closeSideMenu() {
    this.appService.setIsMenuOpen(false);
  }
  menuClicked() {
    this.appService.setIsMenuOpen(!this.isMenuOpen);
  }
  logout() {
    this.authService.logout();
  }
}
