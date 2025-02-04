
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private login = new Subject<boolean>()
  private userName = ""
  private avatar = ""
  private token = ""
  constructor() { }
  
  setToken(tokenResponse:any){
   
    
    localStorage.setItem("token",JSON.stringify(tokenResponse))
    this.login.next(true)
  }
  resetServiceValue(){
    this.userName = ""
    this.avatar = ""
    this.token = ""
  }
  setData(tokenResponse:any){
   
    if (tokenResponse !== null)
      {
        tokenResponse = JSON.parse(tokenResponse)

        this.userName = tokenResponse.userName
        this.avatar = tokenResponse.avatarImage
        this.token = tokenResponse.token
      }
  }

  getAvatar(){
    return this.avatar
  }
  getUserName(){
    return this.userName
  }
  removeToken(){
    
    localStorage.removeItem("token")
    this.resetServiceValue();
    this.login.next(false)
  }

  getLocalStorageToken(){
    return localStorage.getItem("token")
  }

  getToken(){
    return this.token
  }
  getLoginState(){
    return this.login
  }

}
