import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';


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

  carAdd(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/add"
    return this.httpClient.post<ResponseModel>(newPath,car)
    }
    carDelete(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/delete"
    return this.httpClient.post<ResponseModel>(newPath,car);
    }

    carUpdate(car:Car):Observable<ResponseModel>{
      let newPath=this.apiUrl+"cars/update"
      return this.httpClient.post<ResponseModel>(newPath,car)
    }




  getFilterCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcarfilterdetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getFilterCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/brandfilterid?Id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getFilterCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/colorfilterid?Id="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getFilterCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+"cars/getCarDetailFilterByFilter?brandId="+brandId +"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)

  }
  
}
