import { Injectable } from '@angular/core';

@Injectable()
export class AdminLoginService {

  constructor() {}

  public isLoggedIn(): boolean {
    var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
    if(isAdminLoggedIn==null || isAdminLoggedIn=='false')
        return false;
    else
        return true;
  }

}