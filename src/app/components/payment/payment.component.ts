import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

 cars:Car[]=[];
 defaultImage="Images/default.jpg"

 //rentalCheckForm:FormGroup;

 carId:number;
 customers:Customer[]=[];
 rentDate!:Date;
 returnDate!:Date;
 amountPaye=0;
 dailyPrice:number;
 customerId:number;
 success:boolean;
 rentals:Rental;



 imageBasePath="https://localhost:44313/"

  constructor(private carService:CarService,
    private rentalService:RentalService,
    private customerService:CustomerService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private toastrService:ToastrService,
    private paymentService:PaymentService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarByCarId(params["carId"])
        this.getCustomer();
        //this.checkRental();
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




check(car:Car){
  if(this.customerId===undefined||this.returnDate<=this.rentDate || this.returnDate===undefined || this.rentDate===undefined){
    this.toastrService.error("bilgiler eksik veya hatalı.","Hata")
    this.success=false;
  }
  else{  

    this.carId=car.carId
      let rentalModel=Object.assign({carId:this.carId,customerId:parseInt(this.customerId.toString()),rentDate:this.rentDate, returnDate:this.returnDate})
      this.rentalService.getCheckRule(rentalModel).subscribe(response=>{
        this.success=response.success;
        this.toastrService.success(response.message,"işlem başarılı")
        this.success=response.success;

          this.totalPrice(car);
       
         
          this.paymentService.getSend(this.carId,this.rentDate,this.returnDate, this.amountPaye,this.customerId)
        console.log(rentalModel);

        setTimeout(() => {
          this.toastrService.success('Bilgileriniz onaylandı.');
        }, 1000);

        setTimeout(() => {
          this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...','Ödeme İşlemleri');
        }, 1000);

        setTimeout(() => {    
        this.router.navigate(['payment'])
        }, 2000);

        
      },responseError=>{
      console.log(responseError.error);
        this.toastrService.error("Bu araç seçili tarihler arasında kiralanmış, Lütfen başka bir tarih seçiniz.","HATA")
        this.success=false;
      })     
  }
 
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