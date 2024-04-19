import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private login = new Subject<boolean>()
  private userName = ""
  constructor() { }
  
  setToken(token:any){
    var userInfo = {token: token, username: this.userName}
    localStorage.setItem("token",JSON.stringify(userInfo))
    this.login.next(true)
  }
  setUserName(data:any){
    this.userName = data
  }
  getUserName(){
    var user:any = localStorage.getItem("token")
    if (user !== null)
      {
        user = JSON.parse(user)
        return user.username
      }
    return ""
  }
  removeToken(){
    localStorage.removeItem("token")
    
    this.login.next(false)
  }
  getToken(){
    var token:any = localStorage.getItem("token")
    if (token !== null)
      {
        token = JSON.parse(token)
        return token.token
      }
    return null 
  }
  getLoginState(){
    return this.login
  }

}
