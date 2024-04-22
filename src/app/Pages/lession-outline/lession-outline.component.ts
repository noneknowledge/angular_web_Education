import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-lession-outline',
  templateUrl: './lession-outline.component.html',
  styleUrls: ['./lession-outline.component.css']
})
export class LessionOutlineComponent implements OnInit {
  lessionId:any
  response:any
  token:any
  canComment:boolean = false
  canTest:boolean = false

  constructor(private service:LessionService, private ActiveRoute:ActivatedRoute, private route:Router, private loginService:LoginService){}
  ngOnInit(): void {
    this.token = this.loginService.getToken()
    this.ActiveRoute.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      console.log(this.lessionId)
      console.log("id")
      this.service.getLessionOutLine(this.lessionId,this.token).subscribe(data=>{
        if (data ===null){
          alert("khong tim thay cai nay")
          this.route.navigate(["/"])
        }
        this.response = data
        this.canComment = this.response.canComment
        this.canTest = this.response.canTest

        console.log(data)
      })
    })
  }

  startTest(){
    
    console.log("token")
    console.log(this.token)
    console.log("token")
    if (this.token === null){
      this.route.navigate(['login'])
      return
    }
    if (this.canTest === false){
      alert("Vui lòng hoàn thành các bài trước đó")
      return;
    }

    console.log("id: " + this.lessionId)
    this.route.navigate([`lession/${this.lessionId}`])
  }
}
