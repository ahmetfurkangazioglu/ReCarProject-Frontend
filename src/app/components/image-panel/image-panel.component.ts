import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.css']
})
export class ImagePanelComponent implements OnInit {

  defaultImage="Images/default.jpg"
  imageBasePath="https://localhost:44313/"
  carImages:CarImage[]=[]
  cars:Car[]=[]
  carId:number
  imageId:number


  imageToDelete: CarImage;
  imageToUpdate: CarImage;
  carImageUpdateForm: FormGroup;
  carImageForm:FormGroup;
  imageDataToUpload: any;

  checkDelete:boolean=false;
  checkUpdate:boolean=false;
  checkAdd:boolean=false;


  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private imageService:CarImageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
      this.getCarImagesByCarId(params["carId"])
      this.getCar(params["carId"])
      this.carId=params["carId"];
      }
      this.createCarAddForm();
      this.createImageUpdateForm();
    })
  }


  getCarImagesByCarId(carId:number){
  this.imageService.getCarImageByCarId(carId).subscribe(response=>{
    this.carImages=response.data;
  })
  }

  getCar(carId:number){
    this.carService.getCarsByCarId(carId).subscribe(response=>{
      this.cars=response.data;
    })
  }

  carImageAdd(){
    console.log(this.carImageForm);
   if(this.carImageForm.valid){
    let imageModel = Object.assign({carId:+this.carId},this.carImageForm.value)
    console.log(imageModel);
    this.imageService.carImageAdd(imageModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
    },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")        
        }
      } 
    })
   } else{
     this.toastrService.error("Form Eksik","Hata")
   }
  }


createCarAddForm(){
  this.carImageForm=this.formBuilder.group({
    imagePath:["",Validators.required],
  })
}

createImageUpdateForm(): void {
  this.carImageUpdateForm = this.formBuilder.group({
    imagePath: ['', Validators.required],
  });
}


  checkBool(demo:string, imageId:number){
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
  
    this.imageId=imageId;
   }
  
  
  

   onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file.size > 10 * Math.pow(1024, 2)) {
      this.toastrService.error(
        `Sectiginiz dosya 10MB'tan daha buyuk olamaz: ${(
          Math.round((file.size / Math.pow(1024, 2)) * 100) / 100
        ).toFixed(2)}MB`,
        'Hata'
      );
    } else {
      this.imageDataToUpload = file;
    }
  }



   addImage(): void {
    if (this.carImageForm.valid) {
      const formData: FormData = new FormData();
      formData.append('image', this.imageDataToUpload);
      formData.append('carId', this.carId.toString());
      this.imageService.carImageAdd(formData).subscribe(
        () => {
          this.toastrService.success('Gorsel eklendi', 'Basarili');
          this.reload();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }




  updateImage(): void {
    if (this.carImageForm.valid) {
      const formData: FormData = new FormData();
      formData.append("imageId",this.imageId.toString())
      formData.append('image', this.imageDataToUpload);
      formData.append('carId', this.carId.toString());
      this.imageService.updateImage(formData).subscribe(
        () => {
          this.toastrService.success('Gorsel eklendi', 'Basarili');
          this.reload();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }


  setImageToDelete(image: CarImage): void {
    this.imageToDelete = image;
  }

  setImageToUpdate(image: CarImage): void {
    this.imageToUpdate = image;
  }
  

  reload() {
    this.router
      .navigateByUrl('', {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate(['/cars/image-panel/' + this.carId]);
      });
  }

}

