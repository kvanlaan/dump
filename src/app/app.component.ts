import { Router } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PositionService } from './position.service';
import { Coords } from './coords.model';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ref;
  @ViewChild(NavComponent) navComponent: NavComponent;
  constructor(private positionService: PositionService, private http: Http) {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      const positionOptions = { enableHighAccuracy: false, maximumAge: Infinity, timeout: 15000 };
      navigator.geolocation.watchPosition(this.setPosition.bind(this), this.logError.bind(this), positionOptions);
    }

    // this.ref = new Firebase("https://dump.firebaseio.com")
    // var auth = this.ref.getAuth()
  }

  setPosition(position: any) {
    const newCoords = { lat: position.coords.latitude, lon: position.coords.longitude };
    this.positionService.setPosition(newCoords);
  };
  logError(error: any) {
    this.positionService.setPosition(null);
    console.log('error', error);
    if (error.code == error.PERMISSION_DENIED) {
      console.log("you denied me :-(");
    }
    this.positionService.announceFail();
  };
}
