import { Injectable } from '@angular/core';
import { SubmitOrderPayload } from 'app/models/submit-order-payload';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  postOrder(submitOrderPayload: SubmitOrderPayload) {
  }
}
