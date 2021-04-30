import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  cars:Car[]=[];
  colors:Color[]=[];
  carId:number;
  filterText="";
  defaultImage="Images/default.jpg"
  imageBasePath="https://localhost:44313/"
  brands:Brand[]=[];
  constructor(private carService:CarService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService
    ) { }



  carAddForm:FormGroup;
  carUpdateForm:FormGroup;
  checkDelete:boolean=false;
  checkUpdate:boolean=false;
  checkAdd:boolean=false;
  

    carsFilter:Car[]=[];

  ngOnInit(): void {
    this.getcar()
    this.createCarAddForm()
    this.getBrand();
    this.getColor();
  }


  createCarUpdateForm(car:Car){

    this.carUpdateForm=this.formBuilder.group({
      carName:[car.carName,Validators.required],
      colorId:[car.colorId,Validators.required],
      brandId:[car.brandId,Validators.required],
      modelYear:[car.modelYear,Validators.required],
      dailyPrice:[car.dailyPrice,Validators.required],
      description:[car.description,Validators.required],
    })
   
  }
  
  


  
getcar(){
  this.carService.getCars().subscribe(response=>{
    this.cars=response.data;
  })
}


carAdd(){
if(this.carAddForm.valid){
  this.carAddForm.value.brandId = +this.carAddForm.value.brandId
  this.carAddForm.value.colorId=+this.carAddForm.value.colorId
  let carModel = Object.assign({},this.carAddForm.value)
  console.log(carModel);
  this.carService.carAdd(carModel).subscribe(response=>{
    this.toastrService.success(response.message,"Başarılı")
  },responseError=>{
    if(responseError.error.Errors.length>0){
      for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        
      }
    }
  })
}  else{
  this.toastrService.error("Formunuz Eksik","HATTA")
}
}
 carDelete(){
   let carModel=Object.assign({carId:this.carId})
   console.log(carModel)
  this.carService.carDelete(carModel).subscribe(response=>{
   this.toastrService.success(response.message,"Başarılı")
  },responseError=>{
    this.toastrService.error("Beklenmedik hata","Hatta")
  })
 }
 carUpdate(){
  if(this.carUpdateForm.valid){
  this.carUpdateForm.value.brandId = +this.carUpdateForm.value.brandId
  this.carUpdateForm.value.colorId=+this.carUpdateForm.value.colorId
   let carModel = Object.assign({carId:this.carId},this.carUpdateForm.value)
   this.carService.carUpdate(carModel).subscribe(response=>{
     this.toastrService.success(response.message,"Başarılı")
   },responseError=>{
    if(responseError.error.Errors.length>0){
      for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")        
      }
    } 
   })
  } else{
    this.toastrService.error("Formunuz Eksik","HATTA")
  }
 }


getColor(){
  this.colorService.getColors().subscribe(response=>{
  this.colors=response.data;
  })
}

getBrand(){
this.brandService.getBrands().subscribe(response=>{
  this.brands=response.data;
})
}

createCarAddForm(){
  this.carAddForm=this.formBuilder.group({
    carName:["",Validators.required],
    colorId:["",Validators.required],
    brandId:["",Validators.required],
    modelYear:["",Validators.required],
    dailyPrice:["",Validators.required],
    description:["",Validators.required],
  })
}






checkBool(demo:string,carId:number){
  if(demo==="add"){
   this.checkAdd=true;
   this.checkDelete=false;
   this.checkUpdate=false;
  }
  if(demo==="delete"){
   this.checkAdd=false;
   this.checkDelete=true;
   this.checkUpdate=false;
  }
  if(demo==="update"){
   this.checkAdd=false;
   this.checkDelete=false;
   this.checkUpdate=true;
  }
  this.carId=carId
 }






}










