import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/ımage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImagesService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44323/api/';

  getImages(carId: number): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + 'CarImeges/getimagesbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }

  deleteImage(carImage: Image): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'CarImeges/delete';
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }

  upload(imageFile:File,carId:number):Observable<ResponseModel>{
    const formData = new FormData();
    formData.append("Image",imageFile)
    formData.append("carInfoId",carId.toString());

    let newPath = this.apiUrl + "CarImeges/upload"
    return this.httpClient.post<ResponseModel>(newPath,formData);
  }


  updated(carImageAdd: Image): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'CarImeges/update';
    return this.httpClient.post<ResponseModel>(newPath, carImageAdd);
  }
}
