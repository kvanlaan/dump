import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UberApiService {

  constructor() { }
  getRideEstimate(): number {
    return 12;
  }
}
