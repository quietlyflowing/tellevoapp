import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroFinalPage } from './registro-final.page';

describe('RegistroFinalPage', () => {
  let component: RegistroFinalPage;
  let fixture: ComponentFixture<RegistroFinalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroFinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
