import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-set-password',
  templateUrl: './admin-set-password.component.html',
  styleUrls: ['./admin-set-password.component.css']
})
export class AdminSetPasswordComponent implements OnInit {

  password="";
  retypePassword="";
  mismatch=true;
  showMismatch=false;
  passcode="";

  constructor(private route: ActivatedRoute,private http: HttpClient,public router: Router) { 
  }

  ngOnInit(): void {
    $("#profile-li").hide();
    $("#downloads-li").hide();
    $("#media-li").hide();
    $("#contact-us-li").hide();
    $("#admin-home-li").hide();
    $("#cursor-li").hide();
    $("#admin-masters-li").show();
    $("#admin-login-li").hide();
    $("#home-li").addClass("active");
    $("#home-li-a-id").attr("href","/user/admin/home");
    $("#logout-anchor").attr("href","/user/admin/home");
    $("#dashboard-li").removeClass("active");
    $("#admin-masters-li").removeClass("active");
    $("#navbar-header-id").css("background-color","darkgray");
    $("#bs-example-navbar-collapse-1").css("background-color","darkgray");
    $("#app-header-upper").css("background-color","darkgray");
      this.route.queryParams.subscribe(params => {
      this.passcode=params['key'];
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
    this.http.post<any>('http://localhost:9090/api/v1/admin/set/password?key='+this.passcode+"&password="+this.password, {
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
