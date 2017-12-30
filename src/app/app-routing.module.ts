import { SearchComponent } from './nav/search/search.component';
import { NavComponent } from './nav/nav.component';
import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: NavComponent,

  children: [
    { path: 'search/:id', component: SearchComponent },
    { path: 'search/:id/bad/:idTwo', component: SearchComponent },
  ]
},
{ path: 'map/:id', component: MapComponent },
{ path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule { }
