import {Component} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {User} from '../../models/user';
import {EventsHandler} from '../../Services/eventsHandler.service';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})

export class PageHomeComponent {
  currentUser: User;
  private userDetails: firebase.User = null;
  idTaken: boolean;
  selectedDay: number;
  constructor(private appService: EventsHandler, private service: FirebaseService, private _firebaseAuth: AngularFireAuth) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idTaken = (this.currentUser != null);
    _firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      }});
  }

  FilterByDate(event) {
    this.selectedDay = Number(event.target.value.replace('-', '').replace('-', ''));
    this.service.clickedDay.emit(this.selectedDay);
  }
}
