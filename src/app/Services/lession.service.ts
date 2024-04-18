import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessionService {
  private restfulAPI = "http://localhost:5051/api/Lession"
  private httpOptions = {
    headers : new HttpHeaders({
    'Content-Type':'application/json',
    // 'Authorization' : 'Bearer ${myToken}'
  })}

  constructor(private httpClient : HttpClient) { }

  getAllLession():Observable<any>{
    const url = `${this.restfulAPI}`
    return this.httpClient.get(url,this.httpOptions);
  }

  getLessionOutLine(id:number){
    const url = `${this.restfulAPI}/outline/${id}`
    return this.httpClient.get(url,this.httpOptions);
  }
  getLessionInstruction(id:number){
    const url = `${this.restfulAPI}/instruction/${id}`
    return this.httpClient.get(url,this.httpOptions);
  }
  getLession(id:number){
    const url = `${this.restfulAPI}/${id}`
    return this.httpClient.get(url,this.httpOptions);
  }

}
