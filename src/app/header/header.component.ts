import {Component, OnInit} from '@angular/core';
import {EventsHandler} from '../Services/eventsHandler.service';
import {User} from '../models/user';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean;

  constructor(private appService: EventsHandler, private router: Router, activatedRoute: ActivatedRoute) {
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
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
