import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-verify-mail',
  templateUrl: './user-verify-mail.component.html',
  styleUrls: ['./user-verify-mail.component.css']
})
export class UserVerifyMailComponent implements OnInit {

  isEmailVerified=false;
  key="";
  passwordCode=""; 

  constructor(private route: ActivatedRoute,private http: HttpClient,public router: Router) { }

  ngOnInit(): void {

    $("#profile-li").hide();
    $("#downloads-li").hide();
    $("#media-li").hide();
    $("#contact-us-li").hide();
    $("#admin-home-li").hide();
    $("#cursor-li").hide();
    $("#admin-masters-li").show();
    $("#admin-login-li").show();
    $("#home-li").removeClass("active");
    $("#home-li-a-id").attr("href","/user/admin/home");
    $("#logout-anchor").attr("href","/user/admin/home");
    $("#dashboard-li").removeClass("active");
    $("#admin-masters-li").removeClass("active");
    $("#admin-create-user-li").addClass("active");
    $("#navbar-header-id").css("background-color","darkgray");
    $("#bs-example-navbar-collapse-1").css("background-color","darkgray");
    $("#app-header-upper").css("background-color","darkgray");

    this.route.queryParams.subscribe(params => {
      this.key=params['key'];
      //calling verify api for verification

      this.http.post<any>('http://localhost:9090/api/v1/admin/verify/mail?key='+this.key, {
       }).subscribe({
      next: response => {
        console.log("email verified successfully ", response);
        this.passwordCode=response.key;
        this.isEmailVerified=true;
      },
        error: error => {
          console.log("email verification failed", error);
        }
      })

  });
  }

  navigateToSetPassword()
  {
    window.location.href="/user/admin/set-password?key="+this.passwordCode;
  }

}
