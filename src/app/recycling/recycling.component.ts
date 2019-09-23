import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderPickupEvent } from 'app/models/OrderPickUpEvent';


@Component({
  selector: 'app-recycling',
  templateUrl: './recycling.component.html',
  styleUrls: ['./recycling.component.css']
})
export class RecyclingComponent implements OnInit {
  @Input() list: any;
  @Input() query: string;
  @Output() openOrderPickupModal: EventEmitter<OrderPickupEvent> = new EventEmitter();
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  prepareOrderPickupEvent(address: string) {
    this.openOrderPickupModal.emit({ dropOffLocationAddress: address, item: this.query } as OrderPickupEvent);
  }
  buildMaterialsString(materialsString) {
    if((materialsString.indexOf(this.query) > -1)) {
      materialsString = materialsString.replace(this.query, '<strong class="bold light-red">' + this.query + '</strong>')
    }
    return materialsString;

  }
}
