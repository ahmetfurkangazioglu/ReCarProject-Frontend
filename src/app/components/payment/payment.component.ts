import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

 cars:Car[]=[];
 carId:number;
 customers:Customer[]=[];
 rentDate!:Date;
 returnDate!:Date;
 amountPaye=0;
 dailyPrice:number;
 customerId:number;
 success:boolean;


 imageBasePath="https://localhost:44313/"

  constructor(private carService:CarService,
    private rentalService:RentalService,
    private customerService:CustomerService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarByCarId(params["carId"])
        this.getCustomer();
      }
    })

  }


getCarByCarId(carId:number){
  this.carService.getCarsByCarId(carId).subscribe(response=>{
  this.cars=response.data;
  })
}

getCustomer(){
this.customerService.getCustomers().subscribe(response=>{
  this.customers=response.data;
})
}
 createRental(car:Car){
  this.checkRental(car);
  if(!this.success){
      this.toastrService.warning("Bu araç seçtiğiniz tarihler arasında kiralanmış lütfen başka bir tarih seçiniz")
  }
 }



 checkRental(car:Car){
  if(this.customerId === undefined){
    this.toastrService.warning("Şirket seçmelisiniz")
  }
  else if(this.rentDate>=this.returnDate || this.rentDate ===undefined ||this.returnDate===undefined ){
    this.toastrService.warning("Lütfen geçerli bir tarih seçiniz. ")
  }
  else{ 
  this.carId=car.carId;

  let carToBeRented:Rental ={
    carId :this.carId,
    customerId:this.customerId,
    rentDate:this.rentDate,
    returnDate: this.returnDate
 }
  this.getCheckRule(carToBeRented)
}
 };


 getCheckRule(rental:Rental){
  this.rentalService.getCheckRule(rental).subscribe(response=>{  

    this.success=response.success;
    
  })  
 }

totalPrice(car:Car){
  this.dailyPrice=car.dailyPrice;
  var date1 = new Date(this.returnDate.toString());
  var date2 = new Date(this.rentDate.toString());
  var difference = date1.getTime() - date2.getTime();
  var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
  this.amountPaye = numberOfDays * this.dailyPrice
}
  
}