import { Injectable, Output } from '@angular/core';
import { Coords } from './coords.model';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

declare var google: any;
@Injectable()
export class PositionService {
  position;
  address;

  localStorage;

  constructor(private gmapsApi: MapsAPILoader) {
    this.localStorage = localStorage;
  }

  setPosition(currPosition: Coords) {
    this.position = currPosition;
    const position = this.position;
    if (position !== null && position !== undefined) {
      const lat = Number(position.lat);
      const lng = Number(position.lon);
      this.gmapsApi.load().then(() => {
        const geocoder = new google.maps.Geocoder;
        const latlng = { lat: lat, lng: lng };
        this.position = { lat: lat.toString(), lon: lng.toString() } as Coords;
        geocoder.geocode({ 'location': latlng }, function (results: any, status: any) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              const origin = results[0]
              this.address = origin.formatted_address
              this.saveToLocal('pickupLocation', this.address);
              this.saveToLocal('pickupCoords', this.position);
            }
          };
        }.bind(this))
      })
    }
    this.announceChange();
  }

  getFromLocal(key: string): any {
    let item = this.localStorage.getItem(key);
    if (item && item !== "undefined") {
      return JSON.parse(this.localStorage.getItem(key));
    }

    return;
  }
  saveToLocal(key: string, value: any) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  deleteFromLocal(key: string) {
    this.localStorage.removeItem(key);
  }

  getPosition(): Coords {
    if(this.position!== undefined && this.position !== null) {
    return this.position;
    } else {
      const position = this.getCoordinates();
      return position;
    }
  }
  setAddress(address: string) {
    this.address = address;
    this.announceChange();
  }
  getAddress(): string {
    this.address = this.getFromLocal('pickupLocation');
    return this.address;
  }
  getCoordinates(): Coords {
    const coords = this.getFromLocal('pickupCoords');
    return coords;
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
