import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ExpenseService } from '../expense.service';
import { Expense } from '../list/Expense';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  totalExpense: number = 0;
  item = new FormControl('');
  category : string[] = []
  filteredOptions: Observable<String[]> | undefined;
  expenses : Expense[] | undefined;
  constructor(private router: Router,private service: ExpenseService) {
    
  }
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();

    return this.category.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
   this.service.getAllCategory().subscribe(res =>{
    res.forEach((cat: { [x: string]: string; }) => {
      this.category.push(cat['category'])
    })
      this.filteredOptions = this.item.valueChanges.pipe(
        startWith(''),
        map(value => {
          return value ? this._filter(value as string) : this.category.slice();
        }),
      );
    
   })
  }
  goBackToList(){
    this.router.navigate([""]);
  }
  getItems(){
    if(this.item.value && this.item.value != ''){
      this.service.searchItem(this.item.value).subscribe(res=>{
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
