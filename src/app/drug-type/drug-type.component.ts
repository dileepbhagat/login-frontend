import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import {DrugType} from '../models/drugType.model';

@Component({
  selector: 'app-drug-type',
  templateUrl: './drug-type.component.html',
  styleUrls: ['./drug-type.component.css']
})
export class DrugTypeComponent implements OnInit {

  drugTypeList: DrugType[]=[];
  drugTypeName:string;
  drugTypeShortCode:string;
  drugTypeDateOfCreation:Date;
  drugTypeSerialNo:number;
  newDrugTypeName:string;
  newDrugTypeShortCode:string;
  dateOfCreation:Date=new Date();

  constructor(private http: HttpClient, public router: Router) {
    this.drugTypeName='';
    this.drugTypeShortCode='';
    this.drugTypeDateOfCreation=new Date();
    this.drugTypeSerialNo=-1;
    this.newDrugTypeName='';
    this.newDrugTypeShortCode='';
   }

  ngOnInit(): void {
    $("#addDrugTypeModal").modal('hide');
    $("#editDrugTypeModal").modal('hide');

    // Fetch Drug Type API Calling
    this.http.get<any>('http://localhost:9090/api/v1/admin/master/fetch/drug/type', {
    }).subscribe({
        next: data => {
          this.drugTypeList= data.drugTypeEntities
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

  // Drug Type Master Methods

  showHideDrugTypeMaster()
  {
    if($("#drug-type-show-hide-button").text()=='Hide')
    {
      $("#drug-type-table-id").hide();
      $("#drug-type-show-hide-button").text('Show');
    }
    else
    {
      $("#drug-type-table-id").show();
      $("#drug-type-show-hide-button").text('Hide');
    }
  }

  addNewDrugType()
  {
    $('#addDrugTypeModal').modal('hide');
    this.dateOfCreation=new Date();
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/add/drug/type', {
      "drugTypeName": this.newDrugTypeName,
      "drugTypeShortCode": this.newDrugTypeShortCode
    }).subscribe({
        next: data => {
          this.drugTypeList= data.drugTypeEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  deleteDrugType(serialNo:number)
  {
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/delete/drug/type', {
      "serialNo": serialNo
    }).subscribe({
        next: data => {
          this.drugTypeList= data.drugTypeEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  editDrugType(serialNo:number)
  {
    this.drugTypeSerialNo=serialNo;
    for(var i=0;i<this.drugTypeList.length;i++)
    {
      if(this.drugTypeList[i].serialNo==serialNo)   
      {
        this.drugTypeName=this.drugTypeList[i].drugTypeName;
        this.drugTypeShortCode=this.drugTypeList[i].drugTypeShortCode;
        break;
      }
    }
    $("#editDrugTypeModal").modal('show');
  }

  updateDrugType()
  {
    $("#editDrugTypeModal").modal('hide');
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/edit/drug/type', {
      "serialNo": this.drugTypeSerialNo,
      "documentName": this.drugTypeName,
      "documentShortCode": this.drugTypeShortCode
    }).subscribe({
        next: data => {
          this.drugTypeList= data.drugTypeEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

}
