import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private httpClient:HttpClient) { }

  apiUrl:string="https://localhost:44323/api/"

  getModels(brandId:number):Observable<ListResponseModel<Model>>{
    let newPath=this.apiUrl+"Models/GetList?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Model>>(newPath)
  }
}
