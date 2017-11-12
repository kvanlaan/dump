import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandfillComponent } from './landfill.component';

describe('LandfillComponent', () => {
  let component: LandfillComponent;
  let fixture: ComponentFixture<LandfillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandfillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
