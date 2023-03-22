import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';

import { FormControl } from '@angular/forms';
import { House } from '../House';
@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss']
})
export class LoginHomeComponent {
  
  value: House = {
    houseid : '',
    password : ''
  }
  constructor(
    private router: Router,private service: ExpenseService
  ) { }

  onSubmit() {
    console.log("on submit called")
    this.value.password = btoa(this.value.password)
    this.service.loginUser(this.value).subscribe(
      res=>{
        console.log(res);
        const body : {[session_id: string]:any}  = res
        console.log(body)
        localStorage.setItem('session-id',body['session_id'])
        console.log("completed")
        this.router.navigate(['/dashboard'])
      },
      err => console.log('HTTP Error', err),
    )
  }
  navigateToRegister(){
    this.router.navigate(['/register'])
  }
}
