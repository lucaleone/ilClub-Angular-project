import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Event} from '../models/event';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['../app.component.css']
})
export class EventListComponent implements OnInit {
  eventList: Event[];
  eventKeys: string[];

  @Input() eventsId: string[];
  @Input() selectedDate: number;
  showEvents: Event[];
  currentUser: User;

  @Input() esploraFilter: boolean;
  @Input() ownerFilter: boolean;
  @Input() goingFilter: boolean;
  events: Observable<any[]>;

  constructor(private router: Router, private firebaseService: FirebaseService, private db: AngularFireDatabase) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.events = this.db.list('/Eventi').valueChanges();
  }

  ngOnInit() {
    /*if (this.eventsId !== []) {
      this.loadList(1);
    }
    this.firebaseService.clickedDay.subscribe(num => this.showList(num));*/
  }

  loadList(day: number) {
    /*this.eventKeys = [];
    this.eventList = [];
    this.firebaseService.getData('Eventi.json').subscribe(events => {
      for (const idx in events) {
        console.log(this.eventsId);
        const isOwner = events[idx].owner.toLowerCase() === this.currentUser.email.toLowerCase();
        const isGoing = _.includes(this.currentUser.eventi, idx);
        if ((this.esploraFilter && isOwner === false && isGoing === false) ||
            (this.goingFilter && (isOwner || isGoing)) ||
            (this.ownerFilter && isOwner)) {
          const tmpEvent = {
            key: idx,
            data: events[idx].data,
            id: events[idx].id,
            descrizione: events[idx].descrizione,
            immagine: events[idx].immagine,
            ora: events[idx].ora,
            owner: events[idx].owner,
            partecipanti: events[idx].partecipanti,
            sede: events[idx].sede,
            titolo: events[idx].titolo
          };
          this.eventList.push(tmpEvent);
        }
      }
      this.eventList = _.sortBy(this.eventList, e => e.data);
      this.showList(day); // giorno odierno
    });*/
  }

  showList(selectedDate: number) {
    /*console.log('showList');
    this.showEvents = [];
    for (const event of this.eventList) {
      const eventDate = Number(event.data.replace('-', '').replace('-', ''));
      if (eventDate >= selectedDate) {
        this.showEvents.push(event);
      }
    }*/
  }

  deleteEvent(key: string) {
    if (window.confirm('sicuro di voler cancellare?')) {
      for (const eventidx in this.eventList) {

        if (this.eventList[eventidx].owner === this.currentUser.email.toLowerCase() && this.eventList[eventidx].key === key) {
          // chiave evento
          console.log(key);
          console.log(eventidx);

          this.firebaseService.deleteEvent(key).subscribe(arg => {
            console.log('eliminato');
            this.loadList(1);
          });
        }
      }
    }
  }

  editEvent(key: string) {
    this.router.navigateByUrl('/new-event/' + key);
  }

  partecipaEvent(key: string) {
    const keys = this.currentUser.eventi;
    console.log(Object.keys(keys).length);
    if (_.includes(keys, key)) {
      delete keys[key];
      this.currentUser.eventi = keys;
      // console.log(Object.keys(this.currentUser.eventi).length);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    } else {
      keys[key] = key;
      this.currentUser.eventi = keys;
      // console.log(Object.keys(this.currentUser.eventi).length);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    this.loadList(1);
    // this.firebaseService.edit('Utenti/' + this.currentUser + '/eventi.json', key).subscribe(ids => this.loadList(1));

  }
}
