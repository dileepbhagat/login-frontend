import { Injectable } from '@angular/core';

@Injectable()
export class AdminSetPasswordService {

  constructor() {}

  public isUserVerifiedAndNotLoggedIn(): boolean {
    var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
    var isUserVerified=localStorage.getItem("isForgetOrNewUserVerified")!;
    if(isAdminLoggedIn=='true' || isUserVerified==null || isUserVerified=='false')
        return false;
    else
        return true;
  }

}