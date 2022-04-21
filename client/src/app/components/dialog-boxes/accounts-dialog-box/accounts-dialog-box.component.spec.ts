import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsDialogBoxComponent } from './accounts-dialog-box.component';

describe('AccountsDialogBoxComponent', () => {
  let component: AccountsDialogBoxComponent;
  let fixture: ComponentFixture<AccountsDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
