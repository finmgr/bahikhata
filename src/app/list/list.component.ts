import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router,private service: ExpenseService){
    this.expenses =[];
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
