import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOverviewSheetComponent } from './bottom-sheet-overview-sheet.component';

describe('BottomSheetOverviewSheetComponent', () => {
  let component: BottomSheetOverviewSheetComponent;
  let fixture: ComponentFixture<BottomSheetOverviewSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetOverviewSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetOverviewSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
