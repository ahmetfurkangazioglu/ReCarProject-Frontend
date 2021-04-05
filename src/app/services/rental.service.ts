import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl='https://localhost:44313/api/';
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl+"rentals/getrentaldetail"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  getCheckRule(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl+"rentals/checkrule"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  getAdd(rental:Rental):Observable<ResponseModel>{
 let newPath=this.apiUrl+"rentals/add"
 return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
