import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastExpenseComponent } from './past-expense.component';

describe('PastExpenseComponent', () => {
  let component: PastExpenseComponent;
  let fixture: ComponentFixture<PastExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
