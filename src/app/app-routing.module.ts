import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"customers",component:CustomerComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/details/:carId",component:CardetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/payment/:carId",component:PaymentComponent},
  {path:"payment",component:PaymentAddComponent},
  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
