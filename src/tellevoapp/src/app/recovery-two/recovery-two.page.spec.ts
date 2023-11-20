import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoveryTwoPage } from './recovery-two.page';

describe('RecoveryTwoPage', () => {
  let component: RecoveryTwoPage;
  let fixture: ComponentFixture<RecoveryTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecoveryTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
