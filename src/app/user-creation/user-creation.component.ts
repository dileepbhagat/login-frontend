import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  email="";
  mobileNo="";
  otpSent=false;
  submitClicked=false;
  submitMsg="";
  userOtp="";
  adminOtp="";
  selectedUser="";
  finalSubmitClicked=false;
  finalSubmitMsg="";


  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    $("#profile-li").hide();
    $("#downloads-li").hide();
    $("#media-li").hide();
    $("#contact-us-li").hide();
    $("#admin-home-li").hide();
    $("#cursor-li").hide();
    $("#admin-masters-li").show();
    $("#admin-login-li").hide();
    $("#home-li").removeClass("active");
    $("#home-li-a-id").attr("href","/user/admin/home");
    $("#logout-anchor").attr("href","/user/admin/home");
    $("#dashboard-li").removeClass("active");
    $("#admin-masters-li").removeClass("active");
    $("#admin-create-user-li").addClass("active");
    $("#navbar-header-id").css("background-color","darkgray");
    $("#bs-example-navbar-collapse-1").css("background-color","darkgray");
    $("#app-header-upper").css("background-color","darkgray");

    // admin login related initialization
    var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
    this.selectedUser=localStorage.getItem("username")!;
    if(isAdminLoggedIn=='true')
    {
      $('#loginModal').modal('hide');
      $('#login-user-details').css('display','block');
      $('#cbn-text').css('width','40%');
      $('#cursor-li').hide();
      $("#admin-create-user-li").show();
    }
  }


  sentOtpToAdminAndUser()
  {
    this.submitClicked=false;
    this.http.post<any>('http://localhost:9090/api/v1/admin/generate/otp', {
        "mobNo": this.mobileNo,
        "emailId": this.email,
        "adminUser": this.selectedUser
       }).subscribe({
      next: response => {
        console.log("otp sent successfully ", response);
        this.submitMsg="OTP sent successfully!";
        this.submitClicked=true;
        this.otpSent=true;
      },
        error: error => {
          this.submitMsg="OTP generation failed!";
          this.submitClicked=true;
          console.error('There was an error!', error);
        }
     })
  }

  validateAdminAndUserOTP()
  {
    this.finalSubmitClicked=false;
    this.http.post<any>('http://localhost:9090/api/v1/admin/validate/otp', {
        "mobNo": this.mobileNo,
        "emailId": this.email,
        "adminUser": this.selectedUser,
        "otp": this.userOtp,
        "adminOtp": this.adminOtp
       }).subscribe({
      next: response => {
        console.log("user created successfully ", response);
        this.finalSubmitMsg="user creation success!";
        localStorage.setItem("isForgetOrNewUserVerified","true");
        this.router.navigate(['user/admin/process/user-creation']);
      },
        error: error => {
          this.finalSubmitClicked=true;
          this.finalSubmitMsg=error.error.msg;
          console.error('There was an error!', error);
        }
     })
  }

}
