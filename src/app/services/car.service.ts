import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string="https://localhost:44323/api/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/GetCarDetailDto";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
getCarListBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
  let newPath=this.apiUrl+"Cars/GetCarDetailByBrandId?brandId="+brandId
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
}
  }
