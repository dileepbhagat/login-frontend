import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-user-creation',
  templateUrl: './process-user-creation.component.html',
  styleUrls: ['./process-user-creation.component.css']
})
export class ProcessUserCreationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#profile-li").hide();
    $("#downloads-li").hide();
    $("#media-li").hide();
    $("#contact-us-li").hide();
    $("#admin-home-li").hide();
    $("#cursor-li").hide();
    $("#admin-masters-li").show();
    $("#admin-login-li").show();
    $("#home-li").removeClass("active");
    $("#home-li-a-id").attr("href","/user/admin/home");
    $("#logout-anchor").attr("href","/user/admin/home");
    $("#dashboard-li").removeClass("active");
    $("#admin-masters-li").removeClass("active");
    $("#admin-create-user-li").addClass("active");
    $("#navbar-header-id").css("background-color","darkgray");
    $("#bs-example-navbar-collapse-1").css("background-color","darkgray");
    $("#app-header-upper").css("background-color","darkgray");

    // checking admin is logged in or not
    var isAdminLoggedIn=localStorage.getItem("isAdminLoggedIn")!;
    if(isAdminLoggedIn=='true')
    {
      $('#loginModal').modal('hide');
      $('#login-user-details').css('display','block');
      $('#cbn-text').css('width','40%');
      $('#cursor-li').hide();
      $('#admin-home-li').hide();
      $('#admin-login-li').hide();
      $("#admin-create-user-li").show();
    }
  }

}
