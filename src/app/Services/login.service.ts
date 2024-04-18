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

    localStorage.setItem("token",token)
    this.login.next(true)
  }
  setUserName(data:any){

    this.userName = data
    console.log("service: " + this.userName)
  }
  getUserName(){
    return this.userName
  }
  removeToken(){
    localStorage.removeItem("token")
    this.userName = ""
    this.login.next(false)
  }
  getToken(){
    var token = localStorage.getItem("token")
   
    return token 
  }
  getLoginState(){
    return this.login
  }

}
