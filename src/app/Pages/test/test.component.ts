import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  lessionId:any
  type:any  
  status:any

  constructor(private service:LessionService, private route:ActivatedRoute, private navigate:Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      this.type = params.get('type')
      this.status = params.get('status')      
      console.log(this.lessionId)
      console.log(this.type)
      console.log("id")
      this.service.getLessionOutLine(this.lessionId).subscribe(response=>{
        if (response === null){
          alert("khong tim thay cai nay")
          this.navigate.navigate(["/"])
        }
        console.log(response)
      },error=>{
        console.warn(error.message)
      })
    })
  }
}
