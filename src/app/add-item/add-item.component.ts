import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  itemId : any = ''
  value: Expense = {
    'name' : '',
    'amount' : '',
    'date' : new Date().toISOString()
  }
  primaryAction = 'Save';
  secondaryAction :any = undefined;
  category : string[] = []
  filteredOptions: Observable<String[]> | undefined;
  constructor(private _snackBar: MatSnackBar,private router: Router,private service: ExpenseService) {
    
  }
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();

    return this.category.filter(option => option.toLowerCase().includes(filterValue));
  }
  checkExpense(value : Expense){
    if(value.amount && value.name && value.date){
      return value
    }
    else{
      return false;
    }
  }
  ngOnInit(): void {
   
    this.secondaryAction = undefined;
    var state : any = this.checkExpense(window.history.state);
    if(state){
      this.itemId = state['_id'];
      this.value = state as Expense;
      this.item.setValue(this.value.name);
      this.primaryAction = 'Update';
      this.secondaryAction = 'Delete';
    }
    
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
   
   
    this.router.navigate(["/dashboard"]);
  }
  submit(){
    if(this.primaryAction == 'Update'){
      this.update();
    }
    else{
      this.saveItem();
    }
  }
  delete(){
    this.service.deleteItem(this.itemId).subscribe(res =>{
      this._snackBar.open(this.value.name + ' Deleted Successfully !', 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000
      });
      this.router.navigate(["/dashboard"]);
    },
    err =>{
      this._snackBar.open(err, 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000
      });
    })
    
  }
  update(){
    if(this.item.value && this.item.value != ''){
      this.value.name = this.item.value;
      this.service.updateItem(this.itemId, this.value).subscribe(res =>{
        this._snackBar.open(this.value.name + ' Updated Successfully !', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        this.router.navigate(["/dashboard"]);
      },
      err =>{
        this._snackBar.open("ERROR:"+err, 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      })
    }
  }
}
