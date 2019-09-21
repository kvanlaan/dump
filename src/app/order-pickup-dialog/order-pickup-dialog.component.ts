import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { OrderService } from 'app/services/order.service';
import { SubmitOrderPayload } from 'app/models/submit-order-payload';
import { PositionService } from 'app/position.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Item } from 'app/nav/item.model';
import { map, startWith } from 'rxjs/operators';
import { UberApiService } from 'app/services/uber-api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-order-pickup-dialog',
  templateUrl: './order-pickup-dialog.component.html',
  styleUrls: ['./order-pickup-dialog.component.css']
})

export class OrderPickupDialogComponent implements OnInit {
  pickUpLocationAddress: string;
  dropOffLocationAddress: string;
  items = [];
  item = '';
  weight: number;
  estimate: number;
  chipCtrl = new FormControl();
  @ViewChild('chipInput', { static: false }) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  //   displayedList: Observable<string[]>;
  // list: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  displayedList;
  list: Array<Item> = [
    { label: 'steel can', value: 'steel' },
    { label: 'aluminum can', value: 'can' },
    { label: 'tin can', value: 'tin' },
    { label: 'plastic', value: 'plastic' },
    { label: 'battery', value: 'batteries' },
    // make thing look for value if search does not return label
    { label: 'batteries', value: 'batteries' },
    { label: 'paints', value: 'paint' },
    { label: 'paint', value: 'paint' },
    { label: 'furniture', value: 'furniture' },
    { label: 'table', value: 'furniture' },
    { label: 'chair', value: 'furniture' },
    { label: 'electronics', value: 'Electronics' },
    { label: 'computer', value: 'Electronics' },
    { label: 'laptop', value: 'Electronics' },
    { label: 'electronic', value: 'Electronics' },
    { label: 'ipod', value: 'Electronics' },
    { label: 'speakers', value: 'Electronics' },
    { label: 'electric instruments', value: 'Electronics' },
    { label: 'phone', value: 'Electronics' },
    { label: 'mattress', value: 'landfill' },
    { label: 'microphone', value: 'Electronics' },
    { label: 'appliances', value: 'appliance' },
    { label: 'kitchen appliance', value: 'appliance' },
    { label: 'refrigerator', value: 'refrigerator' },
    { label: 'TV', value: 'television' },
    { label: 'television', value: 'tv' },
    { label: 'blender', value: 'appliance' },
    { label: 'paper', value: 'paper' },
    { label: 'newspaper', value: 'paper' },
    { label: 'magazine', value: 'paper' },
    { label: 'book', value: 'paper' },
    { label: 'cardboard', value: 'cardboard' },
    { label: 'food', value: 'food' },
    { label: 'glass', value: 'glass' },
    // { label: 'dishes', value: 'clothing' },
    { label: 'yard trimmings', value: 'yard trimmings' },
    { label: 'tree limbs', value: 'tree' },
    { label: 'wood', value: 'wood' },
    { label: 'car parts', value: 'auto' },
    { label: 'car', value: 'auto' },
    { label: 'motor oil', value: 'oil' },
    { label: 'car filters', value: 'filters' },
    { label: 'tires', value: 'tire' },
    { label: 'can', value: 'can' },
    // { label: 'toy', value: 'toy' },
    { label: 'trash', value: 'dump' }
  ]
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  orderForm: FormGroup;
  constructor(fb: FormBuilder,
    private uberService: UberApiService, private positionService: PositionService, private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderPickupDialogComponent>, @Inject(MAT_DIALOG_DATA) dialogData) {
    this.pickUpLocationAddress = dialogData.pickupLocationAddress;
    this.dropOffLocationAddress = dialogData.dropOffLocationAddress;
    this.items.push(dialogData.item);
    this.item = dialogData.item;
    this.orderForm = new FormGroup({
      pickUpCtrl: new FormControl(''),
      dropOffCtrl: new FormControl(''),
      chipCtrl: new FormControl(''),
      weightCtrl: new FormControl(0),
    });
    this.orderForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.calculateEstimate();
      }
    })

  this.displayedList = this.orderForm.controls['chipCtrl'].valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.list.slice()));
  }

  ngOnInit() {
    this.pickUpLocationAddress = this.positionService.getAddress();
    this.orderForm.controls['chipCtrl'].setValue(null);
  }
  _filter(value) {
    const filterValue = value.toLowerCase();
    const retVal = this.list.filter(option => option.label.toLowerCase().includes(filterValue));
    return retVal;
  }
  calculateEstimate() {
    this.estimate = this.uberService.getRideEstimate();
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
    const itemIndex = this.items.findIndex(arrayItem => arrayItem === item);
    if (itemIndex > -1) {
      this.items.splice(itemIndex, 1);
    }
  }
  add(item) {

    this.items.push(item.value);
    this.chipInput.nativeElement.value = '';
    this.orderForm.controls['chipCtrl'].setValue(null);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
    if (this.orderForm) {
      this.orderForm.controls['chipCtrl'].setValue(null);
    }
  }

}
