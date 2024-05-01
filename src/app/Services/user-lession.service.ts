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
  updateVocab(vocabId:number,isTrue:string,token:any){
    const url = `${this.restfulAPI}/vocab/update/`
    const header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    const body = {quesId: vocabId, isTrue: isTrue}
    
    return this.httpClient.post(url,body,{headers:header})

  }
  getSentence(token:any,lessionId:number,state:string){
    const url = `${this.restfulAPI}/sentence/${lessionId}/${state}`
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    return this.httpClient.get(url,{headers:header})
  }
  updateSentence(sentenceId:number,isTrue:string,token:any){
    
    const url = `${this.restfulAPI}/sentence/update/`
    const header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    const body = {quesId: sentenceId, isTrue: isTrue}
    
    return this.httpClient.post(url,body,{headers:header})

  }
  getReading(token:any,lessionId:number,state:string){
    const url = `${this.restfulAPI}/reading/${lessionId}/${state}`
    var header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    return this.httpClient.get(url,{headers:header})
  }
  updateReading(readingId:number,isTrue:string, additionalAnswer:string,token:any){
    
    const url = `${this.restfulAPI}/reading/update/`
    const header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })
    const body = {quesId: readingId, isTrue: isTrue, additional: additionalAnswer}
    
    return this.httpClient.post(url,body,{headers:header})
  }

  getTestOutLine(lessionId:number,token:any){
    const url = `${this.restfulAPI}/testoutline/${lessionId}/`
    const header= new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    })

    return this.httpClient.get(url,{headers:header})
  }
}
