import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44313/api";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+"/color/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath) 
   }


   colorAdd(color:Color):Observable<ResponseModel>{
     let newPath = this.apiUrl+"/color/add"
     return this.httpClient.post<ResponseModel>(newPath,color)
   }
  

   colorDelete(color:Color):Observable<ResponseModel>{   
    let newPath = this.apiUrl+"/color/delete"
    return this.httpClient.post<ResponseModel>(newPath,color)
   }

   colorUpdate(color:Color):Observable<ResponseModel>{
     let newPath=this.apiUrl+"/color/update"
     return this.httpClient.post<ResponseModel>(newPath,color);
   }
}
