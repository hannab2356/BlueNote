import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  loginMode = false;
  loginAdminMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  registerToggle(){
    this.registerMode = true;
  }

  loginToggle(){
    this.loginMode = true;
  }

  loginAdminToggle(){
    this.loginAdminMode = true;
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }

  cancelLoginMode(loginMode: boolean){
    this.loginMode = loginMode;
  }

  cancelLoginAdminMode(loginAdminMode: boolean){
    this.loginAdminMode = loginAdminMode;
  }
}
