import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private loginService:LoginService){}

  logIn(){
    this.loginService.setUserName("nam le")
    this.loginService.setToken("hehe")
  }
  logOut(){
    this.loginService.removeToken()
  }
}
