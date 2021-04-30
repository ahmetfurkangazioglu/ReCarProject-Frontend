import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colors:Color[]=[];
  filterText="";
  colorId:number;
  colorName:string;
  colorAddForm:FormGroup;
  checkDelete:boolean=false;
  checkUpdate:boolean=false;
  checkAdd:boolean=false;

  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getColor();
    this.createColorAddForm();
  }


  getColor(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  colorDelete(){
    let colorModel=Object.assign({colorId:this.colorId},this.colorAddForm.value)
   
   this.colorService.colorDelete(colorModel).subscribe(response=>{
     this.toastrService.success(response.message,"Başarılı")

   },responseError=>{
     this.toastrService.error("Beklenmedik Hata","Hata")
   })
  }

  colorUpdate(){
    let colorModel=Object.assign({colorId:this.colorId},this.colorAddForm.value)
    this.colorService.colorUpdate(colorModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
    },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {        
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }
      }
    })
  }

  colorAdd(){
    if(this.colorAddForm.valid){
      let colorModel=Object.assign({},this.colorAddForm.value)

      this.colorService.colorAdd(colorModel).subscribe(response=>{

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


  createColorAddForm(){
     this.colorAddForm=this.formBuilder.group({
       colorName:["",Validators.required]
     })
  }


  checkBool(demo:string,colorId:number,colorName:string){
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
   this.colorId=colorId;
   this.colorName=colorName;
  }
  

}
