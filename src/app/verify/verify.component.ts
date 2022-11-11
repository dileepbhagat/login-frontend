import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  isEmailVerified=true;
  key="";
  passwordCode=""; 

  constructor(private route: ActivatedRoute,private http: HttpClient,public router: Router) { 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.key=params['key'];
      //calling verify api for verification

      this.http.post<any>('http://localhost:9090/api/v1/verify/mail?key='+this.key, {
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
    window.location.href="/set-password?key="+this.passwordCode;
  }

}
