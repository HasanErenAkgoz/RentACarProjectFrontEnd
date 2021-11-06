import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NameStock } from '../models/nameStock';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {


  apiUrl:string="https://localhost:44323/api/"
  constructor(private httpClient:HttpClient) { }


  TotolCarCount():Observable<number>{
    let newPath = this.apiUrl + "Statistics/totalcarcount"
    return this.httpClient.get<number>(newPath)
  }

  NumberofRentedVehicles():Observable<number>{
    let newPath=this.apiUrl+"Statistics/numberofrentedvehicles"
    return this.httpClient.get<number>(newPath)
  }

  TotalNumberofCustomers():Observable<number>{
    let newPath=this.apiUrl+"Statistics/totalnumberofcustomers"
    return this.httpClient.get<number>(newPath)
  }

  TotalMonthlyExpense():Observable<number>{
    let newPath=this.apiUrl+"Statistics/totalmonthlyexpense"
   return this.httpClient.get<number>(newPath)
  }

  NameStockDashBoard():Observable<NameStock>{
      let newPath=this.apiUrl+"Statistics/namestock"
      return this.httpClient.get<NameStock>(newPath);
  }

}
