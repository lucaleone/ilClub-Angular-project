import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class EventsHandler {
  isMenuOpen: Subject<boolean> = new Subject();

  constructor() {
  }

  setIsMenuOpen(_isMenuOpen): void {
    this.isMenuOpen.next(_isMenuOpen);
  }

  getIsMenuOpen(): Observable<boolean> {
    return this.isMenuOpen.asObservable();
  }
}
