
import { DirectionsComponent } from './../directions/directions.component';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
declare var google: any;
import { Location } from '@angular/common';
import { GoogleplaceDirective } from '../directives/googleplace.directive';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GoogleMapsAPIWrapper]
})

export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  showing = '0';
  origin = '';
  showDir = false;
  ready = false;
  directions: any;
  mapHeight = window.innerHeight;
  destination = '4103 Ruskin St';
  destOne: string;
  destTwo: string;
  orgOne: string;
  orgTwo: string;
  @ViewChild('directionsList') directionsList: DirectionsComponent;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mapHeight = window.innerHeight;
  }

  constructor(private gmapsApi: MapsAPILoader, private location: Location) {
  }
  goBack() {
    this.location.back();
  }
  toggleShow() {
    this.showDir = !this.showDir;
  }
  getAddress(place: Object, type: string) {
    if (type === 'origin') {
      this.origin = place['formatted_address'];
    } else {
      this.destination = place['formatted_address'];
    }
    this.getDirections();
  }

  getLocationFormatting() {
    const destArr = this.destination.split(',');
    this.destOne = destArr[0];
    this.destTwo = '';
    for (let i = 1; i < destArr.length; i++) {
      this.destTwo += destArr[i];
      if (i < destArr.length - 1) {
        this.destTwo += ',';
      }
    }
    const orgArr = this.origin.split(',');
    this.orgOne = orgArr[0];
    this.orgTwo = '';
    for (let i = 1; i < orgArr.length; i++) {
      this.orgTwo += orgArr[i];
      if (i < orgArr.length - 1) {
        this.orgTwo += ',';
      }
    }
  }

  ngOnInit() {
    const url = new URL(window.location.href);
    const address = url.pathname.split('/')[2];
    if (address) {
      this.destination = address.replace(/%20/g, ' ');
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.lat = Number(position.coords.latitude);
        this.lng = Number(position.coords.longitude);
        this.gmapsApi.load().then(() => {
          const geocoder = new google.maps.Geocoder;
          const latlng = { lat: this.lat, lng: this.lng };
          geocoder.geocode({ 'location': latlng }, function (this: MapComponent, results: any, status: any) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                let origin = results[0]
                origin = origin.formatted_address
                this.origin = origin;
                this.ready = true;

                this.showing = '1';
                this.directionsList.getDirections(this.origin, this.destination);
                this.getLocationFormatting();
              }
            };
          }.bind(this))
        })
      })
    }

  }

  getDirections() {
    this.directionsList.getDirections(this.origin, this.destination);
    this.getLocationFormatting();
  }
  switch() {
    const dest = this.destination;
    this.destination = this.origin;
    this.origin = dest;
    this.getDirections();
  }
  directionsUpdate() {
    this.directions = this.directionsList.directions;
    let x = 0
    for (let i = 0; i < this.directions.length; i++) {
      this.directions[i].instructions = this.directions[i].instructions.replace(/<(?:.|\n)*?>/gm, '');
      x = x + 1;
    }
  }
}
