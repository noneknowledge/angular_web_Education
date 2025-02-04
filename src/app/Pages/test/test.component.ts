import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';
import { UserLessionService } from 'src/app/Services/user-lession.service';
import { LoginService } from 'src/app/Services/login.service';
import { state } from '@angular/animations';
import { MytoolService } from 'src/app/Services/mytool.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  lessionId:any
  type:string | null = ''
  status:any
  token:any
  response:any
  score:number = 0
  vocabs:any
  current:any
  index:number = 0
  randInt:number = 0
  previousScore:number = 0
  completed = false

  constructor(private ULservice:UserLessionService, private route:ActivatedRoute, private navigate:Router,private loginService:LoginService, private mytool:MytoolService){}

  ngOnInit(): void {
    this.token = this.loginService.getToken();
    if(this.token === "")
      this.navigate.navigate(['/login'])
    this.route.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      this.type = params.get('type')
      this.status = params.get('status')      
      console.log(this.lessionId)
      console.log(this.type)
      console.log("id")
      if(this.type!.toLowerCase() === 'vocab')
        {
          this.ULservice.getVocab(this.token,this.lessionId,  this.status).subscribe(response=>{
            this.response = response
            if (this.response.length === 0){
              alert("Không tìm thấy câu hỏi nào cho phần này.")
              this.navigate.navigate(["/"])
            }
            else{
              
              this.vocabs = this.response
              this.current = this.response[this.index]
              console.log(this.response)
            }
          
          })
        }
      else if (this.type!.toLowerCase() === 'sentence'){
        this.ULservice.getSentence(this.token,this.lessionId,  this.status).subscribe(response=>{
          this.response = response
            if (this.response.length === 0){
              alert("Không tìm thấy câu hỏi nào cho phần này.")
            this.navigate.navigate(["/"])
          }
          else{
            this.response = response
            this.current = this.response[this.index]
            console.log(this.response)
          }
        
        })
      }
      else if (this.type!.toLowerCase() === 'reading'){
        this.ULservice.getReading(this.token,this.lessionId,  this.status).subscribe(response=>{
          this.response = response
            if (this.response.length === 0){
              alert("Không tìm thấy câu hỏi nào cho phần này.")
            this.navigate.navigate(["/"])
          }
          else{
            this.response = response
            this.current = this.response[this.index]
            console.log(this.response)
          }
        
        })
      }
     
    })
  }

  nextSentence(){
    this.mytool.scrollTop();
    if(this.index <= this.response.length - 1)
      {
        this.randInt = this.mytool.getRandomInt(2)
      }
   
    var isTrue = 'false'
    if(this.score !== this.previousScore){
      isTrue = 'true'
    }
    this.previousScore = this.score
    this.ULservice.updateSentence(this.current.senId,isTrue,this.token).subscribe(response=>{
      console.log(response)
    })
    this.increaseCurrentQuestion()
  }


  childEvent(score:any){
    this.score = score
  }

  nextReading(){
    console.log("click")
    var isTrue = "false"
    var additionalAnswer = "false"
    if (this.score - this.previousScore === 200)
      {
        isTrue = 'true'
        additionalAnswer = 'true'
      }
    else if (this.score - this.previousScore === 100){
      isTrue = 'true'
    }
    this.previousScore = this.score
    this.ULservice.updateReading(this.current.readId,isTrue,additionalAnswer,this.token).subscribe(response=>{
      console.log(response);
      
    })
    this.completed = true
  }

  increaseCurrentQuestion(){
    this.index +=1
    if (this.index === this.response.length) 
      {
        alert("da hết câu hỏi");
        this.completed = true
        this.index -=1 
        return
      }
      
    this.current = this.response[this.index]
  }

  nextQuestion(){
    var isTrue = "false"
    if(this.score !== this.previousScore){
      isTrue = 'true'
    }

    this.previousScore = this.score
    this.ULservice.updateVocab(this.current.vocabId,isTrue,this.token).subscribe(response=>{
      console.log(response)
    })
    this.increaseCurrentQuestion()
    
  }
}
