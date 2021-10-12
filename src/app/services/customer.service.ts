import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetail } from '../models/customerDetail';
import { CustomerInfo } from '../models/customerInfo';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl:string="https://localhost:44323/api/"
  constructor(private httpClient:HttpClient) { }
    getCustomer():Observable<ListResponseModel<CustomerDetail>>{
    let newPath=this.apiUrl+"Customers/GetList"
     return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
    }
}