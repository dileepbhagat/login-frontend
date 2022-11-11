import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { windowWhen } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      //this.router.navigate(['dashboard']);
      alert("Please login first to access profile page!");
      window.location.href="/";
      return false;
    }
    return true;
  }
}