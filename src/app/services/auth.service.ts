import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingelResponseModel } from '../models/singelResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44313/api/auth/";

  constructor(private httpClient:HttpClient,
    private localStorage:LocalStorageService,) { }

 login(user:LoginModel){
 return this.httpClient.post<SingelResponseModel<TokenModel>>(this.apiUrl+"login",user)
 }

 register(user:RegisterModel){
   return this.httpClient.post<SingelResponseModel<TokenModel>>(this.apiUrl+"register",user);
 }

 isAuthenticated(){
   if(this.localStorage.get("token")){
    return true;
   }
    else{
     return false;
   }
 }
}
