import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable()
export class AdminUserAuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    var isUserLoggedIn= localStorage.getItem("isUserLoggedIn")!;
    if(isUserLoggedIn=='true')
        return true;
    else
        return false;
  }
}