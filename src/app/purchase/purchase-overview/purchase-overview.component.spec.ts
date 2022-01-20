import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOverviewComponent } from './purchase-overview.component';

describe('PurchaseOverviewComponent', () => {
  let component: PurchaseOverviewComponent;
  let fixture: ComponentFixture<PurchaseOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
