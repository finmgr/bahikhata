import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ExpenseService } from '../expense.service';
import { Expense } from '../list/Expense';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  item = new FormControl('');
  value: Expense = {
    'name' : '',
    'amount' : '',
    'date' : new Date().toISOString()
  }
  category : string[] = []
  filteredOptions: Observable<String[]> | undefined;
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
  saveItem(){
    if(this.item.value && this.item.value != ''){
      this.value.name = this.item.value;
      this.service.save(this.value).subscribe(res=>{
        console.log(res);
        
      })
    }
   
   
    this.router.navigate([""]);
  }
}
