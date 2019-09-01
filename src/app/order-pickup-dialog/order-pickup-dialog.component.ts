import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from 'app/services/order.service';
import { SubmitOrderPayload } from 'app/models/submit-order-payload';
import { PositionService } from 'app/position.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-order-pickup-dialog',
  templateUrl: './order-pickup-dialog.component.html',
  styleUrls: ['./order-pickup-dialog.component.css']
})

export class OrderPickupDialogComponent implements OnInit {
pickUpLocationAddress: string;
dropOffLocationAddress: string;
items = [];
weight: number;
estimate: number;

visible = true;
selectable = true;
removable = true;
addOnBlur = true;
readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private positionService: PositionService, private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderPickupDialogComponent>, @Inject(MAT_DIALOG_DATA) dialogData) { 
    this.pickUpLocationAddress = dialogData.pickupLocationAddress;
    this.dropOffLocationAddress = dialogData.dropOffLocationAddress;
    this.items.push(dialogData.item);
  }

  ngOnInit() {
    this.pickUpLocationAddress = this.positionService.getAddress();
  }
  setAddressPickup(place: Object) {
    this.pickUpLocationAddress = place['formatted_address'];
  }
  setAddressDropOff(place: Object) {
    this.dropOffLocationAddress = place['formatted_address'];
  }
submit() {
  const submitPayload = {
    pickUpLocationAddress: this.pickUpLocationAddress,
    dropOffLocationAddress: this.dropOffLocationAddress,
    items: this.items,
    weight: this.weight,
    estimate: this.estimate
  } as SubmitOrderPayload;
this.orderService.postOrder(submitPayload)
this.dialogRef.close();
}
remove(item) {
  const itemIndex = this.items.findIndex(item);
  this.items = this.items.slice(itemIndex)
}
add(item) {
  this.items.push(item.value);
}
}
