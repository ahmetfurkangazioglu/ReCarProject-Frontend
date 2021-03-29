import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  colors:Color[]=[]
  brandFilterText="";
  colorFilterText="";
  brandId:(string | number);
  colorId:(string | number);

  constructor(private brandService:BrandService,
    private colorService:ColorService ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
       this.brands=response.data;
       
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
    
  }
  getSelectedBrand(brandId:number){

    if (this.brandId == brandId) {
      return true;
    }
    else {
      return false;
    }
  }
  getSelectedColor(colorId:number){

    if (this.colorId == colorId) {
      return true;
    }
    else {
      return false;
    }
  }

}
