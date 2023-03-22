import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { House } from './House';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private http: HttpClient
  ) { }

  getAllExpense(): Observable<any>{
    const url = environment.backend_url + '/expense';
    return this.http.get(url);
  }

  getAllCategory(): Observable<any>{
    const url = environment.backend_url + '/category';
    return this.http.get(url);
  }
  
  save(data: any): Observable<any>{
    const url = environment.backend_url + '/expense';
    return this.http.post(url,data);
  }
  registerHouse(house: House){
    const url = environment.backend_url + '/register';
    return this.http.post(url,house,);
  }
  loginUser(data: House){
    const url = environment.backend_url + '/login';
    return this.http.post(url,data);
  }

  searchItem(itemName: string): Observable<any>{
    const url = environment.backend_url + '/report/' + itemName;
    return this.http.get(url);
  }
}
