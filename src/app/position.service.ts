import { Injectable, Output } from '@angular/core';
import { Coords } from './coords.model';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';
import { MapsAPILoader } from '@agm/core';

declare var google: any;
@Injectable()
export class PositionService {
  position;
  address;
  constructor(private gmapsApi: MapsAPILoader) { }

  setPosition(currPosition: Coords) {
    this.position = currPosition;
    const position = this.position;
    if (position !== null && position !== undefined) {
      const lat = Number(position.lat);
      const lng = Number(position.lon);
      this.gmapsApi.load().then(() => {
        const geocoder = new google.maps.Geocoder;
        const latlng = { lat: lat, lng: lng };
        geocoder.geocode({ 'location': latlng }, function (results: any, status: any) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              const origin = results[0]
              this.address = origin.formatted_address
            }
          };
        }.bind(this))
      })
    }
    this.announceChange();
  }
  getPosition(): Coords {
    return this.position;
  }
  setAddress(address: String) {
    this.address = address;
    this.announceChange();
  }
  getAddress(): String {
    return this.address;
  }
  // Observable string sources
  private positionFail = new Subject<string>();
  // Observable string streams
  positionFailed = this.positionFail.asObservable();
  // Service message commands
  announceFail() {
    this.positionFail.next();
  }
  // Observable string sources
  private positionChange = new Subject<string>();
  // Observable string streams
  positionChanged = this.positionChange.asObservable();
  // Service message commands
  announceChange() {
    this.positionChange.next();
  }
}
