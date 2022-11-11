import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  password="";
  key="";
  retypePassword="";
  mismatch=true;
  showMismatch=false;
  passcode="";
  linkVerified=false;
  linkVerifiedErrorMsg="";
  appId=-1;
  appCode="";
  userId="";

  constructor(private route: ActivatedRoute,private http: HttpClient,public router: Router) { 
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      this.key=params['key'];
      
      // Calling API to get user information
      this.http.post<any>('http://localhost:9091/api/v1/get/user/info?key='+this.key, {
       }).subscribe({
      next: response => {
        this.linkVerified=true;
        this.appId=response.appId;
        this.appCode=response.appShortCode;
        this.userId=response.userId;
        this.passcode=response.key;
      },
        error: error => {
          if(error.error.msg==undefined)
          {
            this.linkVerifiedErrorMsg="HTTP failure response for API";
          }
          else
          {
            this.linkVerifiedErrorMsg = error.error.msg;
          }
        }
      })


    });
  }

  checkPassword()
  {
    if(this.password!=this.retypePassword)
    {
      this.mismatch=true;
      this.showMismatch=true;
    } 
    else
    {
      this.mismatch=false;
      this.showMismatch=false;
    }
  }

  setPassword()
  {
    this.http.post<any>('http://localhost:9090/api/v1/set/password?key='+this.passcode+"&password="+this.password, {
       }).subscribe({
      next: response => {
        console.log("password is set successfully ", response);
        $("#set-password-body-content").hide();
        $("#set-passoword-sucess-div").show();
        $("#set-password-failure-p").hide();
      },
        error: error => {
          console.log("email verification failed", error);
          $("#set-password-body-content").show();
          $("#set-passoword-sucess-div").hide();
          $("#set-password-failure-p").show();
        }
      })
  }

}
