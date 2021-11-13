import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl: string = 'https://localhost:44323/api/';
  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'Rental/getalldetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalCarControl(
    carId: number
  ): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'Rental/getcarcontrol?carId=' + carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  add(rental: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Rental/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
  Update(rental: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Rental/update';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
