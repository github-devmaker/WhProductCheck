import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePalletComponent } from './compare-pallet.component';

describe('ComparePalletComponent', () => {
  let component: ComparePalletComponent;
  let fixture: ComponentFixture<ComparePalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparePalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparePalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
