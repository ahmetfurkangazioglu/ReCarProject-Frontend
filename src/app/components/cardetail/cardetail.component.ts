import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  cars:Car[]=[];
  carImages:CarImage[]=[];
  imageBasePath="https://localhost:44313/"
  constructor(private carImageService:CarImageService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarImagesByCarId(params["carId"]);
        this.getCarsByCarId(params["carId"]);
      }
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe(response=>{
      this.carImages=response.data;
    })
  }
  getCarsByCarId(carId:number){
    this.carService.getCarsByCarId(carId).subscribe(response=>{
      this.cars=response.data
    })
  }

  getSliderClassName(index: Number) {
    if (index == 0) {

      return "carousel-item active";
    } else {
      return "carousel-item";


    }
  }

}
