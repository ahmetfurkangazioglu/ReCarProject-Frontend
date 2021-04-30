import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import{FormsModule , ReactiveFormsModule} from "@angular/forms";
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';

import{ToastrModule} from "ngx-toastr";
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ImagePanelComponent } from './components/image-panel/image-panel.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    CardetailComponent,
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    PaymentComponent,
    PaymentAddComponent,
    AdminPanelComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    ImagePanelComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
