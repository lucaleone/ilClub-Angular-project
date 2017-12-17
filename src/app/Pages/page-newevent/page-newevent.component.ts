import {Component} from '@angular/core';
import {Event} from '../../models/event';
import {Router, ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../firebase.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-page-newevent',
  templateUrl: './page-newevent.component.html',
  styleUrls: ['./page-newevent.component.css']
})

export class PageNeweventComponent {
  currentEvent: Event;
  onSave: boolean;
  onSuccess: string;
  onError: string;
  key: string;
  show = false;
  // email: string;
  currentUser: User;

  constructor(private router: Router,
              activatedRoute: ActivatedRoute,
              private service: FirebaseService) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.key = activatedRoute.snapshot.params['key'];

    if (this.key) {
      this.service.getEvent(this.key).subscribe(event => {
        this.currentEvent = event;
        this.show = true;
      });
    } else {
      this.currentEvent = new Event();
      this.currentEvent.sede = 'Libreria Ostia';
      this.currentEvent.immagine = './assets/type-event/default.jpg';
      this.currentEvent.owner = this.currentUser.email;
      this.show = true;
    }
  }


  cancel() {
    this.onSave = false;
    this.router.navigateByUrl('/home');
  }

  save() {
    this.onSave = true;
    if (!this.key) {
      this.service.createEvent(this.currentEvent).subscribe(arg => {
          this.router.navigateByUrl('/home');
          this.onSuccess = 'Evento salvato';
        },
        err => {
          this.onError = 'errore nel salvataggio';
        }
      );
    } else {
      this.service.editEvent(this.key, this.currentEvent).subscribe(arg => {
          this.router.navigateByUrl('/home');
          this.onSuccess = 'Evento modificato';
        },
        err => {
          this.onError = 'errore nella modifica';
        }
      );
    }
  }
}
