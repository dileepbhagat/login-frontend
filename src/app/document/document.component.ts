import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import {Document} from '../models/document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documentList: Document[]=[];
  documentName:string;
  documentShortCode:string;
  documentDateOfCreation:Date;
  documentSerialNo:number;
  newDocumentName:string;
  newDocumentShortCode:string;
  dateOfCreation:Date;

  constructor(private http: HttpClient, public router: Router) {
    this.documentName='';
    this.documentShortCode='';
    this.documentDateOfCreation=new Date();
    this.documentSerialNo=-1;
    this.newDocumentName='';
    this.newDocumentShortCode='';
    this.dateOfCreation=new Date();
   }

  ngOnInit(): void {
    $("#addDocumentModal").modal('hide');
    $("#editDocumentModal").modal('hide');

    // Fetch Document API Calling
    this.http.get<any>('http://localhost:9090/api/v1/admin/master/fetch/document/list', {
    }).subscribe({
        next: data => {
          this.documentList= data.documentEntities;
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


  // Document Master Methods

  showHideDocumentMaster()
  {
    if($("#document-show-hide-button").text()=='Hide')
    {
      $("#document-table-id").hide();
      $("#document-show-hide-button").text('Show');
    }
    else
    {
      $("#document-table-id").show();
      $("#document-show-hide-button").text('Hide');
    }
  }

  addNewDocument()
  {
    $('#addDocumentModal').modal('hide');
    this.dateOfCreation=new Date();
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/add/document', {
      "documentName": this.newDocumentName,
      "documentShortCode": this.newDocumentShortCode
    }).subscribe({
        next: data => {
          this.documentList= data.documentEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  deleteDocument(serialNo:number)
  {
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/delete/document', {
      "serialNo": serialNo
    }).subscribe({
        next: data => {
          this.documentList= data.documentEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  editDocument(serialNo:number)
  {
    this.documentSerialNo=serialNo;
    for(var i=0;i<this.documentList.length;i++)
    {
      if(this.documentList[i].serialNo==serialNo)   
      {
        this.documentName=this.documentList[i].documentName;
        this.documentShortCode=this.documentList[i].documentShortCode;
        break;
      }
    }
    $("#editDocumentModal").modal('show');
  }

  updateDocument()
  {
    $("#editDocumentModal").modal('hide');
    this.http.post<any>('http://localhost:9090/api/v1/admin/master/edit/document', {
      "serialNo": this.documentSerialNo,
      "documentName": this.documentName,
      "documentShortCode": this.documentShortCode
    }).subscribe({
        next: data => {
          this.documentList= data.documentEntities;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

}
