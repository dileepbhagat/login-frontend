import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('date');
    this.appComponent.username='';
  }

}
