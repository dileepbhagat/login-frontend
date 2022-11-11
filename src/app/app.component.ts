import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Users} from '../app/models/users.model'
import {Session} from '../app/models/session.model'
import {AuthGuardService} from '../app/auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AdminLoginService } from './adminAuth/admin-login.service';
import { Router, CanActivate } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
// import * as $ from "jquery"; 
import * as bootstrap from 'bootstrap';
import * as CryptoJS from 'crypto-js';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService, AuthGuardService]
})
export class AppComponent {
  title = 'neor-project';
  users: Users[]=  [];
  username='';
  password='';
  captcha=null;
  errorMessage;
  currentDate = new Date();
  key = "neorProject";
  sessionTrack: Session[] =[];
  token='Bearer ';
  adminToken='Bearer ';
  forPassWrong=false;
  forgetUsername='';
  resetPassMsg=false;
  resetPassword="";
  retypePassword="";
  requestId="";
  requestNo="";
  otp="";
  otpGenerationMsg="";
  loginErrorMsg="";
  forgetCaptcha="";
  forgetOtp="";
  selectedUsername="";

  // admin related variables

  adminUsername="";
  adminPassword="";
  adminCaptcha="";
  adminOtp="";
  adminOtpGenerationMsg="";
  adminRequestNo="";
  adminLoginErrorMsg="";
  adminForgetUsername="";
  adminForgetCaptcha="";
  adminForgetOtp="";
  adminForPassWrong=false;
  isAdminLoggedIn="";


  // user idle timeout related variables
  idleTime:number=15*1000; // 15 mins

  constructor(private http: HttpClient, public router: Router, public auth: AdminLoginService, private bnIdle: BnNgIdleService) { 
    this.errorMessage=  "";
  }

  ngOnInit(): void {
    var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
    var isUserLoggedIn=localStorage.getItem("isUserLoggedIn")!;
    //if(isAdminLoggedIn=='true')
   // {
      //$('#admin-home-li').hide();
    //}

    if(isUserLoggedIn=="true" || isAdminLoggedIn=='true')
    {
      //alert("You've already logged in, please logout first!");
      //this.router.navigate(['home']);
      this.selectedUsername=localStorage.getItem("username")!;
      this.currentDate=new Date(localStorage.getItem("date")!);
    }
  }

   changeLayout($event:MouseEvent){    
  //   console.log("Save button is clicked!", $event);
  //   var button=<HTMLButtonElement>document.querySelector("button");
  //   if(button.ariaExpanded=='true')
  //   {
  //     document.querySelector("#app-main-div").css
  //     $("#app-main-div").css("overflow-x", "hidden");
  //     $("#app-main-div").css("overflow-y", "scroll");
  //     $("#app-header").css("height","60%");
  //     $("#app-header-upper").css("height","15%");
  //     $("#app-header-lower").css("height","75%");
  //   }
  //   else
  //   {
  //     $("#app-main-div").css("overflow-x", "hidden");
  //     $("#app-main-div").css("overflow-y", "hidden");
  //     $("#app-header").css("height","20%");
  //     $("#app-header-upper").css("height","75%");
  //     $("#app-header-lower").css("height","25%");
  //   }    
   }
   
    showHidePopup()
    {
  //   const varelement= <HTMLElement>$event.currentTarget;
  //   const element= <HTMLElement>varelement.parentElement?.parentElement?.lastChild;
  //   const style= getComputedStyle(element);
  //   element.style.display="block";
  //   element.style.zIndex="1111";
  //   element.style.left="30%"
  //   console.log("Hi");
       document.getElementById("btnrefresh")?.click();
       const headers = { 'Authorization': this.token };
       this.http.get<any>('http://localhost:9090/api/v1/users/fetch', { headers }).subscribe({
        next: data => {
          this.users = data;
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })   
    }

    createSession()
    {
      //var headers = { 'Authorization': this.token };
      //const body = { "username": this.username };
      //var options= { withCredentials: true}; 
      this.http.post<any>('http://localhost:9090/generate/session', { 
        "username": this.username
       }).subscribe({
        next: response => {
            
          },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })

    }

    destroySession()
    {
      //var headers = { 'Authorization': this.token };
      //var options= { withCredentials: true}; 
      this.http.post<any>('http://localhost:9090/destroy/session', {  }).subscribe({
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })
    }

    generateToken(username:string, password:string)
    {
      this.http.post<any>('http://localhost:9090/authenticate', {
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


    //Forget & reset password related functions

    showForgetPasswordPopup()
    {
      $('#loginModal').modal('hide');
      $('#forgetResetModal').modal('show');
      $("#resetModalBody").hide();
      $("#forgetModalBody").show();
      document.getElementById("forget-btnrefresh")?.click();
      this.forPassWrong=false;
    }

    validateUsername()
    {
      //this.generateToken(this.forgetUsername,"password");
     // this.showHidePopup();
     //validating user name
     this.http.post<any>('http://localhost:9090/api/v1/verify/user?key='+this.forgetUsername+"&otp="+this.forgetOtp, {
      }).subscribe({
    next: response => {
      $("#forgetModalBody").hide();
      $("#resetModalBody").show();
      window.location.href="/set-password?key="+response.key;
      //var requestJSON=this.generateJson(this.forgetUsername);
      },
      error: error => {
          this.forPassWrong=true;
          if(error.error.msg==undefined)
            this.errorMessage="HTTP failure response for API";
          else
          this.errorMessage = error.error.msg;
          console.error('There was an error!', error);
      }
    })

    }
    


    generateJson(username:string)
    {
        this.requestId=(this.generateRandom(1000,9999)).toString();
        var otp=(this.generateRandom(100000,999999)).toString();
        var requestJSON={
          "userName": username,
          "requestId": this.requestId,
          "otp": otp,
          "generationTimestamp": new Date(),
          "updatedTimestamp": new Date(),
          "isActive": true
        }
        return requestJSON;
    }

    generateRandom(min:number,max:number) {
      var difference = max - min;
      let rand = Math.random();
      rand = Math.floor( rand * difference);
      rand = rand + min;
      return rand;
  }

    changeResetPassMsg()
    {
      this.resetPassMsg=!this.resetPassMsg;
    }

    // new login related functions

    generateLoginOTP()
    {
      this.otpGenerationMsg="";
      const element=  <HTMLInputElement>document.getElementById("txtCaptcha");
      if(this.captcha!=element.value.split(' ').join(''))    
      {
        this.otpGenerationMsg="Enter correct captcha!";
        console.log("Enter correct captcha");
      }
      else
      {
        this.http.post<any>('http://localhost:9090/api/v1/login/generate/otp', {
          "loginId": this.username,
          "password": this.password,
          "flag":false
          }).subscribe({
        next: response => {
              this.otpGenerationMsg=response.msg;
              this.requestNo=response.key;
          },
          error: error => {
            if(error.error.msg==undefined)
            {
              this.errorMessage="HTTP failure response for API";
              this.otpGenerationMsg="HTTP failure response for API";
            }
            else
            {
              this.errorMessage = error.error.msg;
              this.otpGenerationMsg=error.error.msg;
            }
            console.error('There was an error!', error);
          }
    })
      }
    }

    validateCredentials()
    {
      //this.generateToken(this.username,"password");
      // validation
      this.http.post<any>('http://localhost:9090/api/v1/user/login', {
          "loginId": this.username,
          "password": this.password,
          "otp":  this.otp
          }).subscribe({
        next: response => {
          let currentTime=new Date().getTime();
          this.token+=response.token;
          console.log("validated successfully!");
          localStorage.setItem("firmName",response.firmName);
          $('#loginModal').modal('hide');
          this.currentDate = new Date();
          $('#login-user-details').css('display','block');
          $('#cbn-text').css('width','40%');
          $('#cursor-li').hide();
          localStorage.setItem("token",this.token);
          localStorage.setItem("username",this.username);
          localStorage.setItem("date",this.currentDate.toString());
          localStorage.setItem("isUserLoggedIn","true");
          localStorage.setItem("tokenExpTimestamp",response.tokenExpTimestamp);
          this.selectedUsername=this.username;
          $("#application-li-a").attr("href","/app/register");
          $("#profile-li-a").attr("href","/profile/1");
          $('#user-list-li').hide();
          this.router.navigate(['dashboard']);
          // checking for idle time
          this.bnIdle.startWatching(this.idleTime).subscribe((res) => {
            if (res) {
            alert("Session has expired, Please login again to continue!");
            this.userLogout();
            }
          });
          //this.setupTimers();
        },
        error: error => {
          if(error.error.msg==undefined)
          {
            this.errorMessage="HTTP failure response for API";
            this.loginErrorMsg="HTTP failure response for API";
          }
          else
          {
            this.loginErrorMsg=error.error.msg;
            this.errorMessage = error.error.msg;
          }
          console.error('There was an error!', error);
        }
      });

  }

  userLogout()
    {
      //var headers = { 'Authorization': this.token };
      this.token=localStorage.getItem("token")!;
      const options = {
        headers: new HttpHeaders().append('Authorization', this.token)
      };
      var api="";
      var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
      var body= {"loginId": this.selectedUsername};
      if(isAdminLoggedIn=='true')
      {
        api="http://localhost:9090/api/v1/admin/user/logout";
      }
      else
      {
        api="http://localhost:9090/api/v1/user/logout";
      }
      
      //const requestOptions = { headers: headers };
      
      this.http.post<any>(api, {"loginId": this.selectedUsername}, 
      options ).subscribe({
        next: response => {
          if(isAdminLoggedIn=='true')
            $("#logout-anchor").attr("href","/user/admin/home");
          else
            $('#logout-anchor').attr('href','#');
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('date');
          localStorage.removeItem('isAdminLoggedIn');
          localStorage.removeItem("isUserLoggedIn");
          location.href = $('#logout-anchor').attr('href')!;
          },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })
    }


    autoLogout()
    {
      setTimeout(() => {
        alert("Session is expired, Please login again to continue!");
        this.userLogout();
      }, this.idleTime);
    }


    validateUsernamePasswordAndOTP()
    {
      this.http.post<any>('http://localhost:9090/api/v1/user/login', {
        "loginId": this.username,
        "password": this.password,
        "otp":  this.otp,
        "flag": false
        }).subscribe({
      next: response => {
        console.log("validated successfully!")
        },
        error: error => {
          if(error.error.msg==undefined)
          {
            this.errorMessage="HTTP failure response for API";
            this.loginErrorMsg="HTTP failure response for API";
          }
          else
          {
            this.loginErrorMsg=error.error.msg;
            this.errorMessage = error.error.msg;
          }
          console.error('There was an error!', error);
        }
      })
    }


    // Forget Password related functions

    generateForgetPasswordOTP()
    {
      const element=  <HTMLInputElement>document.getElementById("forget-txtCaptcha");
      if(this.forgetCaptcha!=element.value.split(' ').join(''))
      {
        this.otpGenerationMsg="Enter correct captcha!";
        console.log("Enter correct captcha");
      }
      else
      {
        this.http.post<any>('http://localhost:9090/api/v1/login/generate/otp', {
          "loginId": this.forgetUsername,
          "flag": true
          }).subscribe({
        next: response => {
              this.otpGenerationMsg=response.msg;
              this.requestNo=response.key;
          },
          error: error => {
            if(error.error.msg==undefined)
            {
              this.errorMessage="HTTP failure response for API";
              this.otpGenerationMsg="HTTP failure response for API";
            }
            else
            {
              this.otpGenerationMsg=error.error.msg;
              this.errorMessage = error.error.msg;
            }
            console.error('There was an error!', error);
          }
    })
      }
    }



    // Registration related functions
    changeRegisterColorBlue()
    {
      $("#register-div").css("color","blue");
    }

    changeRegisterColorBlack()
    {
      $("#register-div").css("color","#555");
    }

    showRegisterModal()
    {
      $('#loginModal').modal('hide');
      this.router.navigate(['register']);

    }



    // Admin related functions

    generateAdminLoginOTP()
    {
      this.adminOtpGenerationMsg="";
      const element=  <HTMLInputElement>document.getElementById("adminTxtCaptcha");
      if(this.adminCaptcha!=element.value.split(' ').join(''))    
      {
        this.adminOtpGenerationMsg="Enter correct captcha!";
        console.log("Enter correct captcha");
      }
      else
      {
        this.http.post<any>('http://localhost:9090/api/v1/admin/login/generate/otp', {
          "loginId": this.adminUsername,
          "password": this.adminPassword,
          "flag":false
          }).subscribe({
        next: response => {
              this.adminOtpGenerationMsg=response.msg;
              this.adminRequestNo=response.key;
          },
          error: error => {
            if(error.error.msg==undefined)
            {
              this.errorMessage="HTTP failure response for API";
              this.adminOtpGenerationMsg="HTTP failure response for API";
            }
            else
            {
              this.adminOtpGenerationMsg=error.error.msg;
              this.errorMessage = error.error.msg;
            }
            console.error('There was an error!', error);
          }
    })
      }
    }


    validateAdminCredentials()
    {
      // validation
      this.http.post<any>('http://localhost:9090/api/v1/admin/user/login', {
          "loginId": this.adminUsername,
          "password": this.adminPassword,
          "otp":  this.adminOtp
          }).subscribe({
        next: response => {
          let currentTime=new Date().getTime();
          this.token+=response.token;
          console.log("validated successfully!");
          $('#adminLoginModal').modal('hide');
          this.currentDate = new Date();
          $('#login-user-details').css('display','block');
          $('#cbn-text').css('width','40%');
          $('#admin-login-li').hide();
          localStorage.setItem("token",this.token);
          localStorage.setItem("username",this.adminUsername);
          localStorage.setItem("date",this.currentDate.toString());
          this.selectedUsername=this.adminUsername;

          // storing the isAdminLoggedIn item in session
          localStorage.setItem("isAdminLoggedIn","true");
          localStorage.setItem("tokenExpTimestamp",response.tokenExpTimestamp);
          this.router.navigate(['dashboard']);
          // checking for idle time
          this.bnIdle.startWatching(this.idleTime).subscribe((res) => {
            if (res) {
              alert("Session has expired, Please login again to continue!");
              this.userLogout();
            }
          });
        },
        error: error => {
          if(error.error.msg==undefined)
          {
            this.errorMessage="HTTP failure response for API";
            this.loginErrorMsg="HTTP failure response for API";
          }
          else
          {
            this.loginErrorMsg=error.error.msg;
            this.errorMessage = error.error.msg;
          }
          console.error('There was an error!', error);
        }
    })

    }

    showAdminForgetPasswordPopup()
    {
      $('#adminLoginModal').modal('hide');
      $('#adminForgetResetModal').modal('show');
      document.getElementById("adminForget-btnrefresh")?.click();
      this.adminForPassWrong=false;
    }
    

    generateAdminForgetPasswordOTP()
    {
      const element=  <HTMLInputElement>document.getElementById("adminForget-txtCaptcha");
      if(this.adminForgetCaptcha!=element.value.split(' ').join(''))
      {
        this.adminOtpGenerationMsg="Enter correct captcha!";
        console.log("Enter correct captcha");
      }
      else
      {
        this.http.post<any>('http://localhost:9090/api/v1/admin/login/generate/otp', {
          "loginId": this.adminForgetUsername,
          "flag": true
          }).subscribe({
        next: response => {
              this.adminOtpGenerationMsg=response.msg;
              this.adminRequestNo=response.key;
          },
          error: error => {
            if(error.error.msg==undefined)
            {
              this.adminOtpGenerationMsg="HTTP failure response for API";
              this.errorMessage="HTTP failure response for API";
            }
            else
            {
              this.adminOtpGenerationMsg=error.error.msg;
              this.errorMessage = error.error.msg;
            }
            console.error('There was an error!', error);
          }
    })
      }
    }


    validateAdminUsername()
    {
     //validating admin user name
     this.http.post<any>('http://localhost:9090/api/v1/admin/verify/user?key='+this.adminForgetUsername+"&otp="+this.adminForgetOtp, {
      }).subscribe({
    next: response => {
      $("#adminForgetResetModal").hide();
      localStorage.setItem("isForgetOrNewUserVerified","true");
      window.location.href="/user/admin/set-password?key="+response.key;
      },
      error: error => {
          this.adminForPassWrong=true;
          if(error.error.msg==undefined)
          {
            this.errorMessage="HTTP failure response for API";
          }
          else
          {
            this.errorMessage = error.error.msg;
          }
          console.error('There was an error!', error);
      }
    })

    }

    showCreateUserModal()
    {
      $('#adminLoginModal').modal('hide');
      this.router.navigate(['/user/admin/create-user']);

    }

}
