import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActiveUsers } from '../models/activeUsers.model';

@Component({
  selector: 'app-show-users-list',
  templateUrl: './show-users-list.component.html',
  styleUrls: ['./show-users-list.component.css']
})
export class ShowUsersListComponent implements OnInit {

  firstDate=new Date();
  lastDate=new Date();
  error=false;
  errorMsg="";
  activeUsersList: ActiveUsers[]=[];
  activeTopUsersList: ActiveUsers[]=[];
  activeBottomUsersList: ActiveUsers[]=[];
  unActiveUsersList: ActiveUsers[]=[];
  serialNo=-1;
  loginId="";
  loginTime="";
  dataFetched=false;
  maxDate='';

  constructor(private route: ActivatedRoute,private http: HttpClient,public router: Router) { 
      var dtToday = new Date();
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      var maxDate = year + '-';
      if(month < 10)
          maxDate+= '0' + month.toString()+"-";
      else
          maxDate+= month.toString()+"-";

      if(day < 10)
          maxDate+= '0' + day.toString();
      else
          maxDate+= day.toString();

      this.maxDate=maxDate;
  }

  ngOnInit(): void {
    $("#home-li").removeClass("active");
    $("#user-list-li").addClass("active");
  }

  showUserList()
  {
    if(this.firstDate>new Date() || this.lastDate>new Date())
    {
      this.error=true;
      this.errorMsg="Dates shouldn't be future dates";
    }
    else if(this.firstDate>this.lastDate)
    {
      this.error=true;
      this.errorMsg="Second date should be after first date!";
    }
    else
    {
      this.http.post<any>('http://localhost:9091/api/v1/authenticated/user/list', {
          "firstDate": this.firstDate,
          "lastDate": this.lastDate,
          "appId":  23
          }).subscribe({
        next: response => {
          this.dataFetched=true;
          this.activeUsersList=response.authenticatedUserList;
          this.activeTopUsersList=response.authenticatedTopUserList;
          this.activeBottomUsersList=response.authenticatedBottomUserList;
          this.unActiveUsersList=response.unAuthenticatedUserList;
      },
        error: error => {
          this.error=true;
          this.error=error.error.msg;
        }
      })
    }
  }

}
