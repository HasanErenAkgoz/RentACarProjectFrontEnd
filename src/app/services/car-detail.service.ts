import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl: string = 'https://localhost:44323/api/';
  constructor(private httpClient: HttpClient) {}

  getCarsDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/GetCarDetailDto';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByCarId(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/getCarDetailCarId?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailByCarIds(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getCarDetailCarId?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }


  getCarListBrandId(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'Cars/GetCarDetailByBrandId?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  carDelete(car: CarDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Cars/Delete';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
