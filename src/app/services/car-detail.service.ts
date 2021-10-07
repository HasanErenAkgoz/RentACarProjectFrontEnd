import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl:string="https://localhost:44323/api/"
  constructor(private httpClient:HttpClient) { }

  getCarDetailByCarId(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/getCarDetailCarId?carId="+carId
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath)
  }

}
