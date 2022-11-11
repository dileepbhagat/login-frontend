import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminUserAuthService } from './admin-user-auth.service';

@Injectable()
export class AdminUserAuthGuard implements CanActivate {
  constructor(public auth: AdminUserAuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      alert("User is already logged in, Please logout the user session to continue!");
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}