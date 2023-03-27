import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BottomSheetOverviewSheet } from '../bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';
import { ExpenseService } from '../expense.service';
import { Expense } from './Expense';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  implements OnInit{
  expenses : Expense[];
  totalExpense : any = 0;
  constructor(private _bottomSheet: MatBottomSheet,private router: Router,private service: ExpenseService){
    this.expenses =[];
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewSheet);
  }
  navigateToAddItems(){
    this.router.navigate(['/add'] );
   
  }
  expenseOpened(data: Expense){
    console.log(data)
  }
  navigateToReport(){
    this.router.navigate(['/report'] );
  }
  ngOnInit(): void {
    this.service.getAllExpense().subscribe(res=>{
      this.expenses=res;
      this.expenses.forEach(item => {
        this.totalExpense = this.totalExpense + Number(item.amount);
      });
    })
  }
  
  
}
