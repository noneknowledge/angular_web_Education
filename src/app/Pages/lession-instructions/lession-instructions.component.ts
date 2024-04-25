import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lession-instructions',
  templateUrl: './lession-instructions.component.html',
  styleUrls: ['./lession-instructions.component.css']
})
export class LessionInstructionsComponent implements OnInit {
  lessionId:any
  response:any

  currentTab = "Grammar"

  constructor(private service:LessionService, private route:ActivatedRoute, private navigate:Router){}

  ngOnInit(): void {
    this.lessionId = this.route.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      console.log(this.lessionId)
      console.log("id")
      this.service.getLessionOutLine(this.lessionId).subscribe(data=>{
        if (data ===null){
          alert("khong tim thay cai nay")
          this.navigate.navigate(["/"])
        }
        this.response = data
        console.log(this.response)
      },error=>{
        console.warn(error.message)
      })
    })
  }
  changeTab(event:any){
    this.currentTab = event.target.innerHTML
    
  }
}
