import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  cars:Car[]=[];
  imageBasePath="https://localhost:44313/"
  constructor(private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarImagesByCarId(params["carId"]);
      }
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe(response=>{
      this.cars=response.data;
    })
  }

}
