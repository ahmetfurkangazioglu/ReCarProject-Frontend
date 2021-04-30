import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44313/api/"

  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carImages/carıd?CarId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  carImageAdd(image:FormData):Observable<ResponseModel>{
 let newPath=this.apiUrl+"carImages/add"
 return this.httpClient.post<ResponseModel>(newPath,image)
  }

  updateImage(image: FormData):Observable<ResponseModel> {
    let newPath=this.apiUrl+"carImages/update"
    return this.httpClient.post<ResponseModel>(newPath,image);
  }

  deleteImage(imageModel: CarImage): Observable<ResponseModel> {
    let newPath=this.apiUrl+"carImages/delete"
    return this.httpClient.post<ResponseModel>(newPath,imageModel);
  }
}
