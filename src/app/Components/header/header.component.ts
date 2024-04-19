import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean | undefined
  userName:string |undefined
  constructor(private loginState:LoginService, private router:Router){}
  
  ngOnInit(): void {
    console.log("init")
    var token= this.loginState.getToken()
    console.log(token)
    if(token !== null)
      {
        this.isLoggedIn = true
        this.userName = this.loginState.getUserName();
      }


    this.loginState.getLoginState().subscribe(data=>{
      console.log('is logged ? ' + data)
      console.log(this.isLoggedIn)
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
    this.router.navigate(['home'])
  }

}

