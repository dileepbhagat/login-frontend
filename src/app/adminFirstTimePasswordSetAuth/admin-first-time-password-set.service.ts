import { Injectable } from '@angular/core';

@Injectable()
export class AdminFirstTimePasswordSetService {

  constructor() {}

  public isAdminNotLoggedIn(): boolean {
    var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
    if(isAdminLoggedIn=='true')
        return false;
    else
        return true;
  }

}