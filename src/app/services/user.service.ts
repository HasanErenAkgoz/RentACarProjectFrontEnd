import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = 'https://localhost:44323/api/';

  constructor(private httpClient: HttpClient) {}

  GetAll(): Observable<ListResponseModel<UserModel>> {
    let newPath = this.apiUrl + 'User/getall';
    return this.httpClient.get<ListResponseModel<UserModel>>(newPath);
  }

  GetById(id: number): Observable<SingleResponseModel<UserModel>> {
    let newPath = this.apiUrl + 'User/getbyıd?id=' + id;
    return this.httpClient.get<SingleResponseModel<UserModel>>(newPath);
  }

  GetByMail(email: string): Observable<SingleResponseModel<UserModel>> {
    let newPath = this.apiUrl + 'User/getbymail?email=' + email;
    return this.httpClient.get<SingleResponseModel<UserModel>>(newPath);
  }

  update(userModel: UserModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/updateinfo';
    return this.httpClient.post<ResponseModel>(newPath, userModel);
  }

}
