import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../list/Expense';

@Component({
  selector: 'app-past-expense',
  templateUrl: './past-expense.component.html',
  styleUrls: ['./past-expense.component.scss']
})
export class PastExpenseComponent {
  value = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });
  currrentData : Date = new Date();
  totalExpense: number = 0;
  expenses : Expense[] | undefined;
  constructor(private _snackBar: MatSnackBar,private router: Router,private service: ExpenseService){
    
    this.currrentData.setDate(this.currrentData.getDate());
  }
  goBackToList(){
    this.router.navigate([""]);
  }
  getItems(){
    if(this.value && this.value.value.startDate && this.value.value.endDate){
      this.service.getHistoryExpense(this.value.value.startDate.toISOString(), this.value.value.endDate.toISOString()).subscribe(res=>{
        this.expenses=res;
        this.totalExpense = 0;
        if(this.expenses){
        this.expenses.forEach(item => {
          this.totalExpense = this.totalExpense + Number(item.amount);
        });
      }
      })
    }
    else{
      alert("Enter Item Name");
    }
  }
}
export interface Period{
  startDate: Date | undefined;
  endDate: Date | undefined;
}
