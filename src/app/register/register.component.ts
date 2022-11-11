import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firmName="";
  addressLine1="";
  addressLine2="";
  addressLine3="";
  villageOrCity="";
  state="";
  district="";
  pincode="";
  mobNo="";
  email="";
  panNo="";
  generatedOTP="";
  requestId="";
  enterOTP="";
  token="";
  errorMessage="";
  statusOfOTPValidation=false;
  statusOfRegistration=false;
  allFieldsCheck=false;
  showOTPGenerationFlag=false;
  showOTPGenerationMsg="";
  showOTPValidationFlag=false;
  showOTPValidationMsg="";
  showRegistrationFlag=false;
  showRegistrationMsg="Registration failed!";

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
  }

  generateToken(username:string, password:string)
    {
      this.http.post<any>('http://localhost:9090/api/v1/authenticate', {
          "username": username,
          "password": password
          }).subscribe({
        next: response => {
            this.token = "Bearer "+response.token;
          },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }

  checkInputFields()
  {
    if(this.firmName.length>0 && this.addressLine1.length>0 && this.villageOrCity.length>0 && this.pincode.length>0 && this.district.length>0 && this.state.length>0 && this.panNo.length>0 && this.mobNo.length>0 && this.email.length>0)
    {
      this.showOTPGenerationFlag=false;
      this.showOTPValidationFlag=false;
      this.showRegistrationFlag=false;
      return true;
    } 
    else
    {
      this.showOTPGenerationFlag=true;
      this.showOTPGenerationMsg="Please enter all fields!";
      this.showOTPValidationFlag=false;
      this.showRegistrationFlag=false;
      return false;
    }
  }

  generateOTP()
  {
    //this.token="Bearer "+this.generateToken(this.email,"password");
   
    //var headers = { 'Authorization': this.token };
    //  const body = { "mobNo": this.mobNo, "emailId": this.email };
      //var options= { withCredentials: true}; 
      //this.http.post<any>('http://localhost:9090/api/v1/generate/otp', { body , headers, options }).subscribe({
      this.allFieldsCheck=this.checkInputFields();
      if(this.allFieldsCheck==true)
      {
        this.http.post<any>('http://localhost:9090/api/v1/generate/otp', {
          "mobNo": this.mobNo,
          "emailId": this.email
          }).subscribe({
        next: response => {
          console.log("otp generated successfully ", response);
          this.showOTPGenerationFlag=true;
          this.showOTPGenerationMsg="OTP generated successfully!";
          this.showOTPValidationFlag=false;
          this.showRegistrationFlag=false;
        },
        error: error => {
            console.error('There was an error!', error);
            this.showOTPGenerationFlag=true;
            this.showOTPValidationFlag=false;
            this.showRegistrationFlag=false;
            this.showOTPGenerationMsg="OTP generation failed!";
        }
     })
    }
  }

  validateOTP()
  {
    //var headers = { 'Authorization': this.token };
    //const body = { "otp": this.enterOTP,"mobNo": this.mobNo,"email": this.email}
    //var options= { withCredentials: true}; 
    //this.http.post<any>('http://localhost:9090/api/v1/validate/otp', { body , headers, options }).subscribe({
    if(this.checkInputFields()==true && this.enterOTP.length>0)
    {
      this.http.post<any>('http://localhost:9090/api/v1/validate/otp', {
        "otp": this.enterOTP,
        "mobNo": this.mobNo,
        "emailId": this.email
       }).subscribe({
      next: response => {
        console.log("otp validated successfully ", response);
        this.statusOfOTPValidation=true;
      },
        error: error => {
            this.errorMessage = error.message;
            this.statusOfOTPValidation=error.error.status;
            this.showOTPValidationFlag=true;
            this.showOTPValidationMsg="OTP validation failed!";
            this.showOTPGenerationFlag=false;
            this.showRegistrationFlag=false;
            console.error('There was an error!', error);
        }
     })
   }
   else
   {
      this.showOTPValidationFlag=true;
      this.showOTPGenerationFlag=false;
      this.showRegistrationFlag=false;
      this.showOTPValidationMsg="Enter the OTP!";
   }
  }

  sendMail(email:string, encRegId:string)
  {
    this.http.post<any>('http://localhost:9090/api/v1/send/mail', {
        "email": email,
        "registrationId": encRegId
       }).subscribe({
      next: response => {
        console.log("email sent successfully ", response);
        this.router.navigate(['process-register']);
      },
        error: error => {
          console.log("email sending failed", error);
        }
      })
  }

  registerFirm()
  {
    this.http.post<any>('http://localhost:9090/api/v1/register', { 
        "firmName": this.firmName,
        "addressLine1": this.addressLine1,
        "addressLine2": this.addressLine2,
        "addressLine3": this.addressLine3,
        "villageOrCity": this.villageOrCity,
        "state": this.state,
        "district": this.district,
        "pincode": this.pincode,
        "mobNo": this.mobNo,
        "emailId": this.email,
        "panNo": this.panNo
        }).subscribe({
        next: response => {
          this.statusOfRegistration=true;

          // Sending email verification
        //  this.sendMail(this.email,response.encRegId);
        
          console.log("registered successfully ", response);
          this.router.navigate(['process-register']);
        },
          error: error => {
              this.errorMessage = error.message;
              console.error('There was an error!', error);
              this.showRegistrationFlag=true;
              this.showRegistrationMsg=error.error.msg;
          }
      })
  }

  validateOTPAndRegisterFirm()
  {
    if(this.checkInputFields()==true && this.enterOTP.length>0)
    {
      this.http.post<any>('http://localhost:9090/api/v1/validate/otp', {
        "otp": this.enterOTP,
        "mobNo": this.mobNo,
        "emailId": this.email
       }).subscribe({
      next: response => {
        console.log("otp validated successfully ", response);
        this.statusOfOTPValidation=true;

        //registering the firm
        this.registerFirm();

      },
        error: error => {
            this.errorMessage = error.message;
            this.statusOfOTPValidation=error.error.status;
            this.showOTPValidationFlag=true;
            this.showOTPValidationMsg="OTP validation failed!";
            this.showOTPGenerationFlag=false;
            this.showRegistrationFlag=false;
            console.error('There was an error!', error);
        }
     })
   }
   else
   {
      this.showOTPValidationFlag=true;
      this.showOTPGenerationFlag=false;
      this.showRegistrationFlag=false;
      this.showOTPValidationMsg="Enter the OTP!";
   }

  }
}
