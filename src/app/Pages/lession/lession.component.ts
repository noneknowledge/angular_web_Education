import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LessionService } from 'src/app/Services/lession.service';
import { MytoolService } from 'src/app/Services/mytool.service';

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
  
  // questions = [
  //   {blankSentence:"I can _ feel you rolling",fillWord:"normal", bait:"out whe are when",type:"scrambled"},
  //   {blankSentence:"i _ fine thank you",fillWord:"am", bait:"out whe are when",type:"scrambled"},
  //   {question:"Word spills out __ your mouth.",bingo:"of", bait:"out of here when",type:"quiz"},
  //   {question:"Cau so 2",bingo:"of", bait:"out of here when",type:"quiz"},
  //   {question:"Hello nigga",type:"speak"},
  //   {question:"Somebody that i used __ know. Somebody that i used __ know.",bingo:"to", bait:"to be here when",type:"fill"},
  //   {question:"Word spills out __ your mouth.",bingo:"of", bait:"out of here when",type:"quiz"},
  //   {question:"I can normal feel you rolling",bingo:"I can normal feel you rolling", bait:"out whe are when",type:"scrambled"},
  //   {question:"Feel like i love somebody that i did not __.",bingo:"have", bait:"to have here when",type:"quiz"},]
  
  refreshInterval:any
  current:any
  randInt:number = 0
  
  constructor(private service:LessionService, private mytool :MytoolService){}
  
  ngOnInit(): void {
    this.service.getLession(1).subscribe(data=>{
      this.apiData = data
      var readings = this.apiData["readings"].map((a:any)=>({...a,type:"reading"}))
      var sentences = this.apiData["sentences"].map((a:any)=>({...a,type:"sentence"}))
      var vocabularies = this.apiData["vocabularies"].map((a:any)=>({...a,type:"vocabulary"}))
      this.vocabs = vocabularies
      this.lessionContent = sentences.concat(readings).concat(vocabularies)
    
      console.log(this.lessionContent)
      console.log( this.apiData)
    });
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
    this.randInt = this.mytool.getRandomInt(2)
    this.index ++;
    console.log(this.lessionContent[this.index])

    // this.startInterval();
    // this.current = this.questions[this.index]


    this.current = this.lessionContent[this.index]
    console.log(this.current.type)
  }
  

}
