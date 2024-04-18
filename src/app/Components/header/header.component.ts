import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean | undefined
  userName:string |undefined
  constructor(private loginState:LoginService){}
  
  ngOnInit(): void {
    console.log("init")
    this.loginState.getLoginState().subscribe(data=>{
      console.log('is logged ? ' + data)
      this.isLoggedIn = data
      if(data===true){
        console.log("header")
        console.log(this.loginState.getUserName())
        console.log("header")
        this.userName = this.loginState.getUserName();
      }
    })
  }

  logOut(){
    this.loginState.removeToken();
  }

}

