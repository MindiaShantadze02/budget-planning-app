import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteDialogComponent } from './account-delete-dialog.component';

describe('AccountDeleteDialogComponent', () => {
  let component: AccountDeleteDialogComponent;
  let fixture: ComponentFixture<AccountDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
