import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDataPage } from './registro-data.page';

describe('RegistroDataPage', () => {
  let component: RegistroDataPage;
  let fixture: ComponentFixture<RegistroDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
