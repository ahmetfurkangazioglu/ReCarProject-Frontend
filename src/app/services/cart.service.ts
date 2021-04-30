import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { CarComponent } from '../components/car/car.component';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';

import { CartItems } from '../models/cartItems';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cars:Car[]=[];
   
  
  constructor( private carService:CarService,
    private cartComponent:CarComponent ) { }

  addToCart(){
    

   this.carService.getFilterCars().subscribe(response=>{
      this.cars=response.data;  
      this.cars.forEach((element  =>{
        let item = CartItems.find(c=>c.car.carId===element.carId)  
        if(item){
        item.quantity+=1;
        }
        else{
        let cartItem= new CartItem()
        cartItem.car=element
        cartItem.quantity=1
        CartItems.push(cartItem);
        }   
      }))
    })
  
  }
   
  list():CartItem[]{
    return CartItems;
  }
  
}
