import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLessionService {
  private restfulAPI = "http://localhost:5051/api/UserLession"
  

  constructor(private httpClient : HttpClient) { }

  getVocab(token:any,lessionId:number,state:string){
    const url = `${this.restfulAPI}/vocab/${lessionId}/${state}`
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    return this.httpClient.get(url,{headers:header})
  }
  updateScore(vocabId:number,isTrue:string,token:any){
    const url = `${this.restfulAPI}/vocab/update/`
    const header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    const body = {vocabId: vocabId, isTrue: isTrue}
    
    return this.httpClient.post(url,body,{headers:header})

  }
}
