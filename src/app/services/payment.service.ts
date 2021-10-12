import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl:string="https://localhost:44323/api/"
  constructor(private httpClient: HttpClient) { }


  payment(card: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'CreditCards/payment', card);
  }

  add(card: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'CreditCards/add', card);
  }

  getCardByUserId(userId:number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiUrl + ' CreditCards/getbyid?userId='+userId);
  }

  getAllCustomerId(customerId:number): Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl + 'CreditCards/getallbyid?customerId='+customerId);
  }
}
