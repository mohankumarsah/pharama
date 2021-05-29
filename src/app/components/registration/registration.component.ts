import { RegistrationModel } from './../../model/RegistrationModel';
import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  isEmptyOrSpace = function(text: string) {
    let inValid = new RegExp('^[_A-z0-9]{1,}$');
    return inValid.test(text);
  };
  
   isValidUser!:boolean;
  userIdValidationBool!:boolean;

 userIdValidationMessage!:string;
  
  reistrationForm!: FormGroup;
  registrationModel=new RegistrationModel('','','','','')
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(private fb: FormBuilder,private registrationService : RegistrationService,
    private router: Router) {

   }

  ngOnInit() {
    this.reistrationForm = this.fb.group({
      userId: ['', Validators.required],
      orgName: ['', Validators.required],
      emailId: ['', Validators.email],
  
      mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],


      
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.reistrationForm.controls;
  }
  onSubmit(){
    this.isValidUser=false;
    if (this.reistrationForm.valid) {
      
      (this.registrationService.register(this.registrationModel).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/login']);
          
        },
        error => {
          this.isValidUser = true
          console.log(error.status);
  
        }
      )
      );
    }
    
  }

   isUserIdExists(key:any) {
     console.log(key);
     
     if(key.type=== "keyup"){
      let userId=this.registrationModel.userId;
      console.log(userId);
      console.log("string check :",this.isEmptyOrSpace(userId));
      
      if(this.isEmptyOrSpace(userId)===false){
        console.log("FAIL...........");
        alert('user id cantain only character and digit');
    
      }
      if(userId.length<4){
        this.userIdValidationBool=true;
        this.userIdValidationMessage="User id must 4 character";

      }
      if(userId.length>=4 && userId.length<=8){
        this.userIdValidationBool=false;
        this.userIdValidationMessage="";
          this.registrationService.isUserExists(userId).subscribe(s=>{
            console.log("Api response : ",s);
            if(s==true){
              this.userIdValidationBool=true;
              this.userIdValidationMessage="User id exists";
          
            }
  
          });
        

      }
      if(userId.length>8){
        this.userIdValidationBool=true;
        this.userIdValidationMessage="User id must 4 to 8  character";

      }
       console.log(this.registrationModel.userId)

     }
  }
}
