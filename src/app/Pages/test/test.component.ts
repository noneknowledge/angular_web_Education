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

  constructor(private ULservice:UserLessionService, private route:ActivatedRoute, private navigate:Router,private loginService:LoginService, private mytool:MytoolService){}

  ngOnInit(): void {
    this.token = this.loginService.getToken();
    if(this.token === null)
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
            if (response === null){
              alert("khong tim thay cai nay")
              this.navigate.navigate(["/"])
            }
            else{
              this.response = response
              this.vocabs = this.response
              this.current = this.response[this.index]
              console.log(this.response)
            }
          
          })
        }
     
    })
  }

  nextQuestion(){
    if(this.type === 'sentence') {
      this.randInt = this.mytool.getRandomInt(2)
    }
    var isTrue = "false"
    if(this.score !== this.previousScore){
      isTrue = 'true'
    }
    debugger
    this.previousScore = this.score
    this.ULservice.updateScore(this.current.vocabId,isTrue,this.token).subscribe(response=>{
      console.log(response)
    })
    
    this.index +=1
    if (this.index === this.response.length -1) this.index =0;
    this.current = this.response[this.index]
    

  }
}
