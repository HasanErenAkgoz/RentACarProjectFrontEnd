import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/ımage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44323/api/";

  getImages(carId:number):Observable<ListResponseModel<Image>>{
    let newPath=this.apiUrl+"CarImeges/getimagesbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath)
}
}
