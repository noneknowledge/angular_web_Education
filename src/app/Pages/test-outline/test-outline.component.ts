import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test-outline',
  templateUrl: './test-outline.component.html',
  styleUrls: ['./test-outline.component.css']
})
export class TestOutlineComponent implements OnInit {
  lessionId:any
  redoPart = ""

  constructor(private service:LessionService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      console.log(this.lessionId)
      console.log("id")
      // this.service.getLessionOutLine(this.lessionId).subscribe(response=>{
      //   if (response === null){
      //     alert("khong tim thay cai nay")
      //     this.navigate.navigate(["/"])
      //   }
      //   console.log(response)
      // },error=>{
      //   console.warn(error.message)
      // })
    })
  }

  showModal(type:string){
    this.redoPart = type.trim().toLowerCase();
  }

  closeModal(){
    this.redoPart = ''
  }

  confirm(){
    this.router.navigate([`/test/${this.lessionId}/${this.redoPart}/clear`])
  }
  

}
