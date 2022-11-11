import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  isEmailVerified=false;
  isEmailVerifiedMsg="";
  key="";
  passwordCode=""; 
  otpRefNo="1234";
  enteredOTP="";
  clickedVerify=false;
  clickedVerifyMsg="";
  appId=-1;

  constructor(private route: ActivatedRoute,private http: HttpClient,public router: Router) { 
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.key=params['key'];
      //calling verification api for verification

      this.http.post<any>('http://localhost:9091/api/v1/email/verification?key='+this.key, {
       }).subscribe({
      next: response => {
        console.log("email verified successfully ", response);
        this.isEmailVerified=true;
        this.otpRefNo=response.otpRef;
        this.appId=response.appId;
        this.isEmailVerifiedMsg=response.msg;
      },
        error: error => {
          console.log("email verification failed", error);
          if(error.error.msg==undefined)
          {
            this.isEmailVerifiedMsg="HTTP failure response for API";
          }
          else
          {
            this.isEmailVerifiedMsg = error.error.msg;
          }
        }
      })

  });
  }

  mobVerification()
  {
    if(this.enteredOTP!=null && this.enteredOTP!='')
    {
      this.clickedVerify=true;
      this.http.post<any>('http://localhost:9091/api/v1/mobile/verification', {
          "appId": this.appId,
          "otp": this.enteredOTP
          }).subscribe({
        next: response => {
          this.clickedVerifyMsg=response.msg;
          console.log("Mob verified success!");
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



