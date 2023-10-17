import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorClasePage } from './conductor-clase.page';

describe('ConductorClasePage', () => {
  let component: ConductorClasePage;
  let fixture: ComponentFixture<ConductorClasePage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ConductorClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
