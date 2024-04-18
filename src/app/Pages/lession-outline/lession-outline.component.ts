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

  constructor(private service:LessionService, private ActiveRoute:ActivatedRoute, private route:Router, private loginService:LoginService){}
  ngOnInit(): void {
    this.ActiveRoute.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      console.log(this.lessionId)
      console.log("id")
      this.service.getLessionOutLine(this.lessionId).subscribe(data=>{
        if (data ===null){
          alert("khong tim thay cai nay")
          this.route.navigate(["/"])
        }
        this.response = data 
      })
    })
  }

  startTest(){
    var token = this.loginService.getToken()
    if (token === null){
      this.route.navigate(['login'])
    }

    console.log("token")
    console.log(token)
    console.log("token")
    console.log("id: " + this.lessionId)
    this.route.navigate([`lession/${this.lessionId}`])
  }
}
