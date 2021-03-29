import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44313/api/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/brandid?Id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/colorid?Id="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getCarDetailById?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+"cars/getCarDetailByFilter?brandId="+brandId +"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)

  }
}
