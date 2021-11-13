import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  apiUrl: string = 'https://localhost:44323/api/';

  constructor(private httpClien: HttpClient) {}

  GetAll(): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'OperationClaim/getall';
    return this.httpClien.get<ListResponseModel<OperationClaim>>(newPath);
  }

  GetById(id: number): Observable<SingleResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'OperationClaim/getbyıd?id='+id;
    return this.httpClien.get<SingleResponseModel<OperationClaim>>(newPath);
  }

  GetByName(name: string): Observable<SingleResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'OperationClaim/getbyname?name='+name;
    return this.httpClien.get<SingleResponseModel<OperationClaim>>(newPath);
  }

  Add(operationClaim:OperationClaim):Observable<ResponseModel>{
    let newPath=this.apiUrl+"OperationClaim/add"
    return this.httpClien.post<ResponseModel>(newPath,operationClaim)
  }

  Delete(operationClaim:OperationClaim):Observable<ResponseModel>{
    let newPath=this.apiUrl+"OperationClaim/delete"
    return this.httpClien.post<ResponseModel>(newPath,operationClaim)
  }

  Update(operationClaim:OperationClaim):Observable<ResponseModel>{
    let newPath=this.apiUrl+"OperationClaim/update"
    return this.httpClien.post<ResponseModel>(newPath,operationClaim)
  }
}
