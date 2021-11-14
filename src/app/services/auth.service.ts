import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { LoginModel } from '../models/loginModel';
import { OperationClaim } from '../models/operationClaim';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserOperationClaimDto } from '../models/userOperationClaimDto';
import { PasswordChangeModel } from '../models/passwordChangeModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://localhost:44323/api/';
  roles: string[] = [];
  currentUserId: number;
  jwtHelper:JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient
    ,private storageService:LocalStorageService ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      loginModel
    );
  }
  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      registerModel
    );
  }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getClaims(id: number): Observable<ListResponseModel<OperationClaim>> {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(
      this.apiUrl + 'User/getbyıd?id=' + id
    );
  }
  setClaim(id: number): Observable<ListResponseModel<UserOperationClaimDto>> {
    return this.httpClient.get<ListResponseModel<UserOperationClaimDto>>(
      this.apiUrl + 'UserOperationClaim/getbyuserıd?id=' + id
    );
  }

  changePassword(passwordChangeModel:PasswordChangeModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Auth/changepassword"
    return this.httpClient
    .post<ResponseModel>(newPath,passwordChangeModel)
  }

}
