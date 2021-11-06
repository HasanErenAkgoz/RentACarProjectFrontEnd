import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetailService } from './car-detail.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl: string = 'https://localhost:44323/api/';
  constructor(private httpClient: HttpClient) {}

  getCarsbyId(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/GetByCarId?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  Update(car: CarDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Cars/Update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  Add(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"Cars/Add"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
}
