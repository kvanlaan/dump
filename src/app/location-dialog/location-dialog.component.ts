import { Component, OnInit } from '@angular/core';
import { PositionService } from '../position.service';
import { Coords } from '../coords.model';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})


export class LocationDialogComponent {
  constructor(private positionService: PositionService) {
  };
  address: any;

  public getAddress(place: Object) {
    this.address = place['formatted_address'];
    const geometry = place['geometry'];
    const location = geometry['location'];
    const lat = location['lat'];
    const lng = location['lng'];
    const newCoords = { lat: lat(), lon: lng() } as Coords;
    this.positionService.setAddress(this.address);
    this.positionService.setPosition(newCoords);
    this.positionService.announceChange();
  }
}