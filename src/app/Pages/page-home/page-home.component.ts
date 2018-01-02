import {Component} from '@angular/core';
import {EventsHandler} from '../../Services/eventsHandler.service';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['../../app.component.css']
})

export class PageHomeComponent {

  selectedDate: number;
  constructor(private appService: EventsHandler, private userService: AuthService) {

    console.log('HOME: è l"utente loggato ' + userService.isLoggedIn());
  }

  FilterByDate(event) {
    this.selectedDate = Number(event.target.value.replace('-', '').replace('-', ''));
  }
}
