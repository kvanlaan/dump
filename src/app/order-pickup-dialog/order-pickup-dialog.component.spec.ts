import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPickupDialogComponent } from './order-pickup-dialog.component';

describe('OrderPickupDialogComponent', () => {
  let component: OrderPickupDialogComponent;
  let fixture: ComponentFixture<OrderPickupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPickupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPickupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
