import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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
    return this.httpClient.post(url,body,{headers:header,responseType:'text'})
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
}
