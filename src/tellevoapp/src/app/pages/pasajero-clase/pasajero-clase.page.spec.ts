import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasajeroClasePage } from './pasajero-clase.page';

describe('PasajeroClasePage', () => {
  let component: PasajeroClasePage;
  let fixture: ComponentFixture<PasajeroClasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasajeroClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
