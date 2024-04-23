import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/Services/user.service';
import { formatDistanceToNow,isToday } from 'date-fns';
import { vi } from 'date-fns/locale';


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
  userName:string | undefined
  avatarImage:string | undefined
  comments:any[] = []
  topRanks:any[] = []
  testValue=100

  constructor(private service:LessionService,private userLessionService: UserService, private ActiveRoute:ActivatedRoute, private router:Router, private loginService:LoginService){}
  ngOnInit(): void {
    this.token = this.loginService.getToken()
    this.userName = this.loginService.getUserName();
    this.avatarImage = this.loginService.getAvatar();
    this.ActiveRoute.paramMap.subscribe(params=>{
      this.lessionId = Number(params.get('id'))
      this.service.getLessionOutLine(this.lessionId,this.token).subscribe(data=>{
        if (data ===null){
          alert("khong tim thay cai nay")
          this.router.navigate(["/"])
        }
        this.response = data
        this.comments = this.response.comments
        this.canComment = this.response.canComment
        this.topRanks = this.response.topRank
        this.canTest = this.response.canTest

        console.log(data)
      },
      (error:HttpErrorResponse) => {
        console.log(error.status)
       
        if (error.status === 500)
          {
            this.router.navigate(["interval-error"])
          }
      }
    )
    })
  }

  sendComment(textAreaValue:any){
    console.log(textAreaValue)
    if (textAreaValue.length===0) return;
    var body= {
      LessionId : this.lessionId,
      Comment : textAreaValue
    }
    this.userLessionService.updateComment(body,this.token).subscribe(response =>{
      console.log(response)

      let date = new Date()
      let dateOnly = date.toISOString().split("T")[0]
      var newComment = {avatarImage: this.avatarImage, userName:this.userName,comment:textAreaValue, commentDate: dateOnly  }
      this.comments.unshift(newComment)
    })
  }

  dateFromNow(date:Date){
    if(isToday(date)) return "Hôm nay"

    let distance = formatDistanceToNow(date, { addSuffix: true, locale: vi });
    
    return distance
  }

  startTest(){
    
    if (this.token === null){
      this.router.navigate(['login'])
      return
    }
    if (this.canTest === false){
      alert("Vui lòng hoàn thành các bài trước đó")
      return;
    }

    console.log("id: " + this.lessionId)
    this.router.navigate([`lession/${this.lessionId}`])
  }
}
