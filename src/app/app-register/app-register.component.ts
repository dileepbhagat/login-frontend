import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})
export class AppRegisterComponent implements OnInit {
  appCode="";
  appName="";
  emailId="";
  mobNo="";
  emailVerified=false;
  mobVerified=false;
  loginId="";
  otpDiv=false;
  enteredOTP="";
  otpMsg="";
  clickedSendOTP=false;
  appId="";
  clickedSubmit=false;
  submitMsg="";
  fileName="";
  otpSentToRegAdmin=false;
  otpRefNo="";

  clickedVerify=false;
  clickedVerifyMsg="";

  constructor(private http: HttpClient, public router: Router) {

   }

  ngOnInit(): void {
    $("#home-li").removeClass("active");
    $("#dashboard-li").removeClass("active");
    $("#application-li").addClass("active");
  }

  sendOTP()
  {
    if(this.appCode!=null && this.appCode!='' && this.appName!=null && this.appName!='' && this.emailId!=null &&
    this.emailId!='' && this.mobNo!=null && this.mobNo!='')
    {
    this.clickedSendOTP=true;
    this.http.post<any>('http://localhost:9091/api/v1/send/otp', {
          "appShortCode": this.appCode,
          "emailId": this.emailId,
          "appName":  this.appName,
          "mobNo": this.mobNo
          }).subscribe({
        next: response => {
          this.otpDiv=true;
          this.otpMsg=response.msg;
          this.appId=response.appId;
        },
        error: error => {
          if(error.error.msg==undefined)
            {
              this.otpMsg="HTTP failure response for API";
            }
            else
            {
              this.otpMsg = error.error.msg;
            }
        }
        });
      }
  }

  createApplication()
  {
    this.otpSentToRegAdmin=false;
    this.submitMsg="";
    if(this.appCode!=null && this.appCode!='' && this.appName!=null && this.appName!='' && this.emailId!=null &&
    this.emailId!='' && this.mobNo!=null && this.mobNo!='' && this.fileName!=null && this.fileName!='')
    {
    this.clickedSubmit=true;
    this.http.post<any>('http://localhost:9091/api/v1/application/creation', {
          "appShortCode": this.appCode,
          "adminEmail": this.emailId,
          "appName":  this.appName,
          "adminMob": this.mobNo
          }).subscribe({
        next: response => {
          console.log("Application Created successfully");
          this.submitMsg="OTP sent successfully!";
          this.otpSentToRegAdmin=true;
          this.otpRefNo=response.otpRef;
          $("#app-register-submit").prop("disabled",true);
        },
        error: error => {
          if(error.error.msg==undefined)
            {
              this.submitMsg="HTTP failure response for API";
            }
            else
            {
              this.submitMsg = error.error.msg;
            }
        }
        });
    }
  }

  verifyAdminOTPAndCreateApplication()
  {
    this.clickedVerify=true;
    if(this.appCode!=null && this.appCode!='' && this.appName!=null && this.appName!='' && this.emailId!=null &&
    this.emailId!='' && this.mobNo!=null && this.mobNo!='' && this.fileName!=null && this.fileName!='' && this.enteredOTP!=null && this.enteredOTP!='')
    {
    this.http.post<any>('http://localhost:9091/api/v1/verify/admin/otp/application/creation', {
          "appShortCode": this.appCode,
          "emailId": this.emailId,
          "appName":  this.appName,
          "mobNo": this.mobNo,
          "fileName": this.fileName,
          "adminOtp": this.enteredOTP
          }).subscribe({
        next: response => {
          this.clickedVerifyMsg=response.msg;
          console.log("Application Created successfully");
          $("#app-register-popup-verify").prop("disabled",true);
        },
        error: error => {
          if(error.error.msg==undefined)
            {
              this.clickedVerifyMsg="HTTP failure response for API";
            }
            else
            {
              this.clickedVerifyMsg = error.error.msg;
            }
        }
        });
    }
  }

}
