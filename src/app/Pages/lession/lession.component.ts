import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { LessionService } from 'src/app/Services/lession.service';
import { LoginService } from 'src/app/Services/login.service';
import { MytoolService } from 'src/app/Services/mytool.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-lession',
  templateUrl: './lession.component.html',
  styleUrls: ['./lession.component.css']
})
export class LessionComponent implements OnInit, AfterViewInit{
  
  lessionContent = []
  apiData:any
  score = 0
  gameCont:HTMLElement | undefined | null
  clock:HTMLElement | undefined | null
  scorePlace:HTMLElement | undefined | null
  index:number = -1
  vocabs:any
  lessionId:number | undefined
  refreshInterval:any
  current:any
  randInt:number = 1
  
  constructor( private router:Router,private userService:UserService,private loginService:LoginService ,private service:LessionService, private mytool :MytoolService, private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.lessionId = Number(params.get("id"))
      this.service.getLession(this.lessionId).subscribe(data=>{
        this.apiData = data
        var readings = this.apiData["readings"].map((a:any)=>({...a,type:"reading"}))
        var sentences = this.apiData["sentences"].map((a:any)=>({...a,type:"sentence"}))
        var vocabularies = this.apiData["vocabularies"].map((a:any)=>({...a,type:"vocabulary"}))
        vocabularies = this.mytool.shuffleArray(vocabularies)
        this.vocabs = vocabularies
        var firstTenVocab = vocabularies.splice(0,10);
        this.lessionContent = sentences.concat(readings).concat(firstTenVocab)
        console.log(this.lessionContent)
        if(this.lessionContent.length === 0){
          alert("bai hoc nay chua co content nao ca")
        }
      });
    })
   
  }

  randomIntFromInterval(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  stopInterval(){
      clearInterval(this.refreshInterval)
  }
  
  startInterval(cd=1){
    
    var time = 15;
    this.refreshInterval = setInterval(
        ()=>{
            
            this.clock!.innerHTML = `${time}s`
            time --
            if (time < 0){
                this.stopInterval();
                this.nextClick();
            }
        },1000 * cd)
  }

 
  ngAfterViewInit(): void {
    this.gameCont = document.getElementById("gameContainer")
    this.clock = document.getElementById("timeDown")
    this.scorePlace = document.getElementById("score")


  }
  nextClick(){
    // this.stopInterval() 
    // this.randInt = this.mytool.getRandomInt(2)
    this.index ++;

    // this.startInterval();
    if (this.index >= this.lessionContent.length){
      var token = this.loginService.getToken()
      var body = {Score: this.score, LessionID:this.lessionId, Comment:""}
      this.userService.updateLessionScore(body,token).subscribe(response=>{
        console.log(response)
        this.router.navigate([`/outline/${this.lessionId}`])

      })
      return ;
    }
    this.current = this.lessionContent[this.index]

  }
  

}
