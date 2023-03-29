import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'bottom-sheet-overview-sheet',
  templateUrl: './bottom-sheet-overview-sheet.component.html',
})
export class BottomSheetOverviewSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheet>, private router: Router) {}

  openLink(event: any): void {
    this._bottomSheetRef.dismiss();
    this.router.navigate(['/'+event] );
    event.preventDefault();

  }
}