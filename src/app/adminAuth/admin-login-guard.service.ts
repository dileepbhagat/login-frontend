import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AdminLoginService } from '../adminAuth/admin-login.service';
 
@Injectable()
export class AdminLoginGuardService implements CanActivate {
 
  constructor(private router:Router, private auth:AdminLoginService) {      
  }      
 
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
      console.log("canActivate");      //return true    
     //remove comments to return true
     if(this.auth.isLoggedIn()==false)
     {              
        alert('You are not allowed to view this page. You are redirected to Home Page'); 
        this.router.navigate(["/user/admin/home"]);
        return false;
     }
     else             
        return true;     
} }