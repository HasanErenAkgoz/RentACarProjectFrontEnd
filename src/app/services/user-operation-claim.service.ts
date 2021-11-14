import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserOperationClaim } from '../models/userOperationClaim';
import { UserOperationClaimDto } from '../models/userOperationClaimDto';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  apiUrl: string = 'https://localhost:44323/api/';
  constructor(private httpClient: HttpClient) {}

  GetAll(): Observable<ListResponseModel<UserOperationClaimDto>> {
    let newPath = this.apiUrl + 'UserOperationClaim/getall';
    return this.httpClient.get<ListResponseModel<UserOperationClaimDto>>(
      newPath
    );
  }

  GetById(id:number):Observable<ListResponseModel<UserOperationClaimDto>>{
    let newPath=this.apiUrl+"UserOperationClaim/getbyıd?id="+id
    return this.httpClient.get<ListResponseModel<UserOperationClaimDto>>(newPath);
  }

  Add(UserOperationClaim: UserOperationClaimDto): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'UserOperationClaim/add';
    return this.httpClient.post<ResponseModel>(newPath, UserOperationClaim);
  }

  Delete(UserOperationClaim: UserOperationClaimDto): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'UserOperationClaim/delete';
    return this.httpClient.post<ResponseModel>(newPath, UserOperationClaim);
  }

  Update(UserOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'UserOperationClaim/update';
    return this.httpClient.post<ResponseModel>(newPath, UserOperationClaim);
  }
}
