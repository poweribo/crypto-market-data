import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTickerComponent } from './product-ticker.component';

describe('ProductTickerComponent', () => {
  let component: ProductTickerComponent;
  let fixture: ComponentFixture<ProductTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
