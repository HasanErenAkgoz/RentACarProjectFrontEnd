import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  apiUrl:string="https://localhost:44323/api/"
  constructor(private httpClient: HttpClient) { }

  FindexQuery(carId: number,customerInfoId:number): Observable<ResponseModel> {
    let newPath=this.apiUrl+'Findeks/query?carId=' + carId + '&customerId=' + customerInfoId
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
