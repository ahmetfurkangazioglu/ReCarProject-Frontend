import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ImagePanelComponent } from './components/image-panel/image-panel.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

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
  {path:"admin-panel",component:AdminPanelComponent, canActivate:[LoginGuard]},
  {path:"caradd",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"brandadd",component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"coloradd",component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"cars/image-panel/:carId",component:ImagePanelComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginRegisterComponent},

  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
