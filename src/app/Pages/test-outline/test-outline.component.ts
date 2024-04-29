import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';
import { UserLessionService } from 'src/app/Services/user-lession.service';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-test-outline',
  templateUrl: './test-outline.component.html',
  styleUrls: ['./test-outline.component.css']
})
export class TestOutlineComponent implements OnInit {
  lessionId:any
  token:any
  redoPart = ""
  response:any
  vocabPercent = 0
  senPercent = 0
  readPercent = 0

  constructor(private ULService:UserLessionService,private loginService:LoginService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      this.token = this.loginService.getToken();
      
      this.ULService.getTestOutLine(this.lessionId,this.token).subscribe(response=>{
        this.response = response
        this.vocabPercent = Math.floor(this.response.doneVocab/this.response.totalVocab * 100)
        this.senPercent = Math.floor(this.response.doneSentence/this.response.totalSentence *100)
        this.readPercent = Math.floor(this.response.doneReading/this.response.totalReading*100)

        console.log(response)
      })
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
