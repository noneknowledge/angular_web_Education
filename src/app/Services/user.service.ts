import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tokenResponse } from '../Models/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private restfulAPI = "http://localhost:5051/api/User"
  


  constructor(private httpClient : HttpClient) { }
  login(payload:any){
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      // 'Authorization' : 'Bearer ${myToken}'
    })
    var url = `${this.restfulAPI}/login`
    var body = payload
    return this.httpClient.post<tokenResponse>(url,body,{headers:header})
  }
  register(payload:any){
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      // 'Authorization' : 'Bearer ${myToken}'
    })
    var url = `${this.restfulAPI}/register`
    var body = payload
    return this.httpClient.post(url,body,{headers:header})
  }

  getProfile(token:any){
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    var url = `${this.restfulAPI}/profile`
    return this.httpClient.get(url,{headers:header})
  }

  updateComment(body:any,token:any){
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    var url = `http://localhost:5051/api/userlession/comment`
    return this.httpClient.put(url,body,{headers:header})
  }

  updateLessionScore(body:any,token:any){
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    var url = `http://localhost:5051/api/userlession`
    return this.httpClient.put(url,body,{headers:header})
  }
}
