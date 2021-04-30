import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

 
  brands:Brand[]=[];
  filterText="";
  brandId:number;
  brandName:string;
  brandAddForm:FormGroup;
  checkDelete:boolean=false;
  checkUpdate:boolean=false;
  checkAdd:boolean=false;

  constructor(private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getBrand();
    this.createBrandAddForm();
  }


  getBrand(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  brandDelete(){
    let brandModel=Object.assign({brandId:this.brandId},this.brandAddForm.value)
    console.log(brandModel);
   this.brandService.brandDelete(brandModel).subscribe(response=>{
     this.toastrService.success(response.message,"Başarılı")

   },responseError=>{
     this.toastrService.error("Beklenmedik Hata","Hata")
   })
  }

  brandUpdate(){
    let brandModel=Object.assign({brandId:this.brandId},this.brandAddForm.value)
    this.brandService.brandUpdate(brandModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
    },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {        
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }
      }
    })
  }

  brandAdd(){
    if(this.brandAddForm.valid){
      let brandModel=Object.assign({},this.brandAddForm.value)

      this.brandService.brandAdd(brandModel).subscribe(response=>{

        this.toastrService.success(response.message,"Başarılı");

      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }
        }
      })

    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
    
  }


  createBrandAddForm(){
     this.brandAddForm=this.formBuilder.group({
       brandName:["",Validators.required]
     })
  }


  checkBool(demo:string,brandId:number,brandName:string){
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
   this.brandId=brandId;
   this.brandName=brandName;
  }
}
