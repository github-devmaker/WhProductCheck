import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanFgComponent } from './scan-fg.component';

describe('ScanFgComponent', () => {
  let component: ScanFgComponent;
  let fixture: ComponentFixture<ScanFgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanFgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
