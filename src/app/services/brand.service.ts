import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl:string="https://localhost:44323/api/"
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>
  {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"Brands/GetList")
  }
  
  Add(brand:Brand):Observable<ResponseModel>{
  let newPath=this.apiUrl+"Brands/Add"
  return this.httpClient.post<ResponseModel>(newPath,brand)
  }
}
