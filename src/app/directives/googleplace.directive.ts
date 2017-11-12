import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

declare var google: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[googleplace]',
  providers: [NgModel, GoogleMapsAPIWrapper]
})
export class GoogleplaceDirective {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  modelValue: any;
  autocomplete: any;
  private _el: HTMLElement;


  constructor(private gmapsApi: MapsAPILoader, el: ElementRef, private model: NgModel) {
    this._el = el.nativeElement;
    this.modelValue = this.model;
    const input = this._el;
    this.gmapsApi.load().then(() => {
      if (google !== undefined) {
        this.autocomplete = new google.maps.places.Autocomplete(input, {});
        google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
          const place = this.autocomplete.getPlace();
          this.invokeEvent(place);
        });
      }
    })
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }


  onInputChange() {
  }
}