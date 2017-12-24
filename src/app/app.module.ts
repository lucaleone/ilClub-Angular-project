import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './app.routes';

import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
// Pages
import {PageLoginComponent} from './Pages/page-login/page-login.component';
import {PageHomeComponent} from './Pages/page-home/page-home.component';
import {PageNeweventComponent} from './Pages/page-newevent/page-newevent.component';
import {PageNotfoundcomponentComponent} from './Pages/page-notfoundcomponent/page-notfoundcomponent.component';
import {PageProfileComponent} from './Pages/page-profile/page-profile.component';
import { PageEsploraComponent } from './Pages/page-esplora/page-esplora.component';
// Components
import {EventListComponent} from './event-list/event-list.component';
import {HeaderComponent} from './header/header.component';
import {SideMenuComponent} from './sidemenu/sidemenu.component';
// Services
import {AuthService} from './Services/auth.service';
import {FirebaseService} from './firebase.service';
import {EventsHandler} from './Services/eventsHandler.service';
// Guards
import {NewEventGuard} from './Pages/page-newevent/newevent.guard';
import {AuthGuard} from './Guards/auth.guard';
// Modules
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    // Pages
    PageHomeComponent,
    PageNeweventComponent,
    PageNotfoundcomponentComponent,
    PageProfileComponent,
    PageLoginComponent,
    PageEsploraComponent,
    // Components
    HeaderComponent,
    SideMenuComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase, 'ilClub'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    FirebaseService,
    NewEventGuard,
    AuthGuard,
    EventsHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
