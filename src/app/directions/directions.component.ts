import { Component, OnInit, EventEmitter } from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, Output } from '@angular/core';
declare var google: any;
@Component({
  selector: 'directions',
  template: ''
})

export class DirectionsComponent {
  @Output() directionsUpdate: EventEmitter<any>;
  @Input() origin: any;
  directionsService;
  directionsDisplay;
  directions: any;
  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
    this.directionsUpdate = new EventEmitter();
  }
  onInit() {

  }
  getDirections(origin?: string, destination?: string): any {
    if (!this.directionsService && !this.directionsDisplay) {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
    }
    let directions: any;
    this.gmapsApi.getNativeMap().then((map: any) => {
      console.log('map', map);

      this.directionsDisplay.setDirections({ routes: [] });
      this.directionsDisplay.setMap(map);
      console.log('directionsDisplay', this.directionsDisplay);
      this.directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (this: DirectionsComponent, response: any, status: any) {
        console.log('status', status);
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);

          directions = response.routes[0].legs[0].steps;
        } else {
          console.log('failed');
        }
        this.directions = directions;
        this.directionsUpdate.emit(directions);
      }.bind(this));

    });

  }
}


