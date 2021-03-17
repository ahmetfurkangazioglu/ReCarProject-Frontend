import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44313/api/"

  getCarImageByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"carImages/carıd?CarId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
