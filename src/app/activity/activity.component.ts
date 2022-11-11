import { Component, OnInit } from '@angular/core';
import {Purpose} from '../models/purpose.model';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activityList: Purpose[]=[];
  activityName:string;
  activityShortCode:string;
  dateOfCreation:Date;
  serialNo:number;
  newActivityName:string;
  newActivityShortCode:string;

  constructor(private http: HttpClient, public router: Router) {
    this.newActivityName='';
    this.newActivityShortCode=''; 
    this.activityName='';
    this.activityShortCode='';
    this.dateOfCreation=new Date();
    this.serialNo=-1;
   }

  ngOnInit(): void {

    $("#addActivityModal").modal('hide');
    $("#editActivityModal").modal('hide');

    // Fetch Activity API Calling
    this.http.get<any>('http://localhost:9090/api/v1/admin/master/fetch/purpose/data', {
    }).subscribe({
        next: data => {
          this.activityList= data.purposeEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })

    $("#profile-li").hide();
    $("#downloads-li").hide();
    $("#media-li").hide();
    $("#contact-us-li").hide();
    $("#admin-home-li").hide();
    $("#cursor-li").hide();
    $("#admin-masters-li").show();
    $("#admin-login-li").hide();
    $("#home-li").removeClass("active");
    $("#home-li-a-id").attr("href","/user/admin/home");
    $("#dashboard-li").removeClass("active");
    $("#admin-masters-li").addClass("active");
    $("#navbar-header-id").css("background-color","darkgray");
    $("#bs-example-navbar-collapse-1").css("background-color","darkgray");
    $("#app-header-upper").css("background-color","darkgray");

    // admin login related initialization
    var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
    if(isAdminLoggedIn=='true')
    {
      $('#loginModal').modal('hide');
      $('#login-user-details').css('display','block');
      $('#cbn-text').css('width','40%');
      $('#cursor-li').hide();
      $("#admin-create-user-li").show();
    }
  }


  showHideActivityMaster()
  {
    if($("#activity-show-hide-button").text()=='Hide')
    {
      $("#activity-show-hide-button").text('Show');
    } 
    else
    {
      $("#activity-table-id").show();
      $("#activity-show-hide-button").text('Hide');
    }
  }

  addNewActivity()
  {
    $('#addActivityModal').modal('hide');
    this.dateOfCreation=new Date();
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/add/purpose/data', {
      "purposeName": this.newActivityName,
      "purposeShortCode": this.newActivityShortCode
    }).subscribe({
        next: data => {
          this.activityList= data.purposeEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })

  }

  deleteActivity(serialNo:number)
  {
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/delete/purpose/data', {
      "serialNo": serialNo
    }).subscribe({
        next: data => {
          this.activityList= data.purposeEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  editActivity(serialNo:number)
  {
    this.serialNo=serialNo;
    for(var i=0;i<this.activityList.length;i++)
    {
      if(this.activityList[i].serialNo==serialNo)
      {
        this.activityName=this.activityList[i].purposeName;
        this.activityShortCode=this.activityList[i].purposeShortCode;
        break;
      }
    }
    $("#editActivityModal").modal('show');
  }

  updateActivity()
  {
    $("#editActivityModal").modal('hide');
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/edit/purpose/data', {
      "serialNo": this.serialNo,
      "purposeName": this.activityName,
      "purposeShortCode": this.activityShortCode
    }).subscribe({
        next: data => {
          this.activityList= data.purposeEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

}
