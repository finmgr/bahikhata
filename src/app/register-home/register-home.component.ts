import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { House } from '../House';

@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.scss']
})
export class RegisterHomeComponent {
  error = ''
  value: House = {
    houseid : '',
    password : ''
  }
  confirmPassword: string = '';
  constructor(
    private router: Router,private service: ExpenseService
  ) { }
  navigateToLogin(){
      this.router.navigate(["/"])
  }
  passwordsMatch(): boolean {
    return this.value.password === this.confirmPassword;
  }
  onSubmit(){

  }
}
