import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { FakePayment } from '../models/fakePayment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
carId:number;
 rentDate!:Date;
 returnDate!:Date;
 customerId:number;
 amountPaye:number;


 apiUrl='https://localhost:44313/api/';

  constructor(private httpClient:HttpClient) { }

  getUpdate(fakePayment:FakePayment):Observable<ResponseModel>{
    let newPath=this.apiUrl+"fakepayment/update";
    return this.httpClient.post<ResponseModel>(newPath,fakePayment);
  }

  getCheckPayment(fakePayment:FakePayment):Observable<ResponseModel>{
   let newPath=this.apiUrl+"fakepayment/checkrule";
   return this.httpClient.post<ResponseModel>(newPath,fakePayment);
  }
 
  getSend(carId:number,rentDate:Date,returnDate:Date,amountPaye:number,customerId:number){
   this.carId=carId
   this.rentDate=rentDate
   this.returnDate=returnDate
   this.customerId=customerId
   this.amountPaye=amountPaye

  }

}
