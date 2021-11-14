import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NameStock } from '../models/nameStock';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  apiUrl: string = 'https://localhost:44323/api/';
  constructor(private httpClient: HttpClient) {}

  TotolCarCount(): Observable<number> {
    let newPath = this.apiUrl + 'Statistics/totalcarcount';
    return this.httpClient.get<number>(newPath);
  }

  NumberofRentedVehicles(): Observable<string> {
    let newPath = this.apiUrl + 'Statistics/numberofrentedvehicles';
    return this.httpClient.get<string>(newPath);
  }

  TotalNumberofCustomers(): Observable<number> {
    let newPath = this.apiUrl + 'Statistics/totalnumberofcustomers';
    return this.httpClient.get<number>(newPath);
  }

  NameStockDashBoard(): Observable<NameStock> {
    let newPath = this.apiUrl + 'Statistics/namestock';
    return this.httpClient.get<NameStock>(newPath);
  }

  TotalBrandCount(): Observable<string> {
    let newPath = this.apiUrl + 'Statistics/totalbrandcount';
    return this.httpClient.get<string>(newPath);
  }

  TotalModelCount(): Observable<number> {
    let newPath = this.apiUrl + 'Statistics/totalmodelcount';
    return this.httpClient.get<number>(newPath);
  }

  TotalMoneyEarned(): Observable<number> {
    let newPath = this.apiUrl + 'Statistics/totalmoneyearned';
    return this.httpClient.get<number>(newPath);
  }

  MostExpensiveCarPlate(): Observable<string> {
    let newPath = this.apiUrl + 'Statistics/mostexpensivecarplate';
    return this.httpClient.get<string>(newPath);
  }

  CheapestCarPlate(): Observable<string> {
    let newPath = this.apiUrl + 'Statistics/cheapestcarplate';
    return this.httpClient.get<string>(newPath);
  }

  TopSellingVehiclePlate(): Observable<string> {
    let newPath = this.apiUrl + 'Statistics/topsellingvehicleplate';
    return this.httpClient.get<string>(newPath);
  }
}
