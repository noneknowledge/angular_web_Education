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
  avatar:string | undefined

  constructor(private loginState:LoginService, private router:Router){}
  
  ngOnInit(): void {
    
    console.log("init")
    var tokenResponse= this.loginState.getLocalStorageToken()
 
    if(tokenResponse !== null)
      {
        this.isLoggedIn = true
        this.loginState.setData(tokenResponse);
        this.userName = this.loginState.getUserName();
        this.avatar = this.loginState.getAvatar();
        console.log(this.avatar)
        console.log(this.userName)
        console.log(this.loginState.getToken())
      }


    this.loginState.getLoginState().subscribe(boolean=>{
      this.isLoggedIn = boolean
      if(boolean===true){
        this.loginState.setData(this.loginState.getLocalStorageToken())
        this.avatar = this.loginState.getAvatar();
        this.userName = this.loginState.getUserName();
      }
    })
  }

  logOut(){
    this.loginState.removeToken();
    this.router.navigate(['home'])
  }

}

