import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';



@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent implements OnInit {


 carId:number;
 rentDate!:Date;
 returnDate!:Date;
 customerId:number;
 amountPaye:number;
 
 paymentAdd:FormGroup;


  constructor(private paymentService:PaymentService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private rentalService:RentalService) { }

  ngOnInit(): void {
    
    this.getInfo();
    this.createPaymentAddForm();
  }

  createPaymentAddForm(){
    this.paymentAdd=this.formBuilder.group({
      cardNumber:["",Validators.required],
      nameOnCard:["",Validators.required],
      cardCvv:["",Validators.required],
      expirationDate:["",Validators.required]
     
    })


   
  }


  checkPayment(){
    if(this.paymentAdd.valid){
      let paymentModel=Object.assign({moneyInCard:this.amountPaye},this.paymentAdd.value)
      let RentalModel = Object.assign({carId:this.carId,customerId:parseInt(this.customerId.toString()),rentDate:this.rentDate,returnDate:this.returnDate} )
      this.paymentService.getCheckPayment(paymentModel).subscribe(data=>{
       

       
          this.toastrService.info('Ödeme işlemi yapılıyor, Lütfen bekleyiniz', "İşlem bekleniyor");
       

        setTimeout(() => {
          this.paymentService.getUpdate(paymentModel).subscribe(data=>{

            this.rentalService.getAdd(RentalModel).subscribe(response=>{

              this.toastrService.success(data.message,"Başarılı");


              setTimeout(()=>{
                this.router.navigate(["/cars"])
              },1000)
             
            },responseError=>{
              this.toastrService.error("Beklenmedik hata lütfen daha sonra tekrar deneyiniz.","Hata")
              console.log(RentalModel)
            })         

          },dataError=>{
            this.toastrService.error("Hesabınızda yeterli miktarda para yok","Hata")
            console.log(dataError.error);
          })
          
        }, 1000);




      },dataError=>{
        this.toastrService.error("Kart bilgileriniz uyuşmuyor");
        console.log(paymentModel)
        console.log(dataError.error);
      } )
    } 
    else{
      this.toastrService.warning("Kart bilgilerini tam ve eksiksiz giremelisiniz","DİKKAT")
    }
  }



  
  getInfo(){
    this.amountPaye = this.paymentService.amountPaye
    this.carId =this.paymentService.carId;
    this.customerId =this.paymentService.customerId;
    this.rentDate =this.paymentService.rentDate;
    this.returnDate=this.paymentService.returnDate;
  }


}
