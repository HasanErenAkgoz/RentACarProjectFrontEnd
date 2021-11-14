import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetail } from '../models/customerDetail';
import { CustomerInfo } from '../models/customerInfo';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

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

    Delete(customer: CustomerDetail): Observable<ResponseModel> {
      let newPath = this.apiUrl + 'Customers/Delete';
      return this.httpClient.post<ResponseModel>(newPath, customer);
    }
    GetById(id:number):Observable<SingleResponseModel<CustomerDetail>>{
      let newPath=this.apiUrl+"Customers/getcustomeruserdetailId?id="+id
      return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath)
    }

    update(customer:CustomerDetail):Observable<ResponseModel>{
      let newPath = this.apiUrl + "Customers/update"
      return this.httpClient
      .post<ResponseModel>(newPath,customer)
    }
}
