import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingComponent } from './recycling.component';

describe('RecyclingComponent', () => {
  let component: RecyclingComponent;
  let fixture: ComponentFixture<RecyclingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
