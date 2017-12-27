import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageHomeComponent } from './Pages/page-home/page-home.component';
import { PageNeweventComponent } from './Pages/page-newevent/page-newevent.component';
import { PageNotfoundcomponentComponent } from './Pages/page-notfoundcomponent/page-notfoundcomponent.component';
import { PageProfileComponent } from './Pages/page-profile/page-profile.component';
import { NewEventGuard } from './Pages/page-newevent/newevent.guard';
import { PageLoginComponent } from './Pages/page-login/page-login.component';
import {AuthGuard} from './Guards/auth.guard';
import { PageEsploraComponent } from './Pages/page-esplora/page-esplora.component';

export const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'esplora',
    component: PageEsploraComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: PageLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'new-event',
    component: PageNeweventComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    canDeactivate: [NewEventGuard]
  },
  {
    path: 'new-event/:key',
    component: PageNeweventComponent,
    pathMatch: 'full',
    canDeactivate: [NewEventGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: PageProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'page-not-found',
    component: PageNotfoundcomponentComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
