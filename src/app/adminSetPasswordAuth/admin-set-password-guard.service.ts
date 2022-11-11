import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AdminSetPasswordService } from '../adminSetPasswordAuth/admin-set-password.service';
 
@Injectable()
export class AdminSetPasswordGuard implements CanActivate {
 
  constructor(private router:Router, private auth:AdminSetPasswordService) {      
  }      
 
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
      console.log("canActivate");      //return true    
     //remove comments to return true
     if(this.auth.isUserVerifiedAndNotLoggedIn()==false)
     {              
        alert('You are not allowed to view this page. You are redirected to Home Page'); 
        this.router.navigate(["/user/admin/home"]);
        return false;
     }
     else             
        return true;     
} }