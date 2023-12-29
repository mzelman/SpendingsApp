import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTransactionDeletionComponent } from './confirm-transaction-deletion.component';

describe('ConfirmTransactionDeletionComponent', () => {
  let component: ConfirmTransactionDeletionComponent;
  let fixture: ComponentFixture<ConfirmTransactionDeletionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmTransactionDeletionComponent]
    });
    fixture = TestBed.createComponent(ConfirmTransactionDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
