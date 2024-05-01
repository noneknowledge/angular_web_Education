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

  }
  logOut(){
    this.loginService.removeToken()
  }

  scrollTop(){
    console.log("scoorl")
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'instant' 
});
  }
}
