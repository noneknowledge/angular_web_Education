import { AfterViewInit, Component,DebugEventListener,EventEmitter,Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MytoolService } from 'src/app/Services/mytool.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit,OnChanges,AfterViewInit {
  @Input() inputQuiz:any;
  @Input() score:any;
  @Input() lessionVocabs: any;
  @Output() scoreEvent = new EventEmitter()

  click = 0
  question:any
  quiz:any
  bingo:any
  quizClassList = ["border","p-2","rounded","quiz"]
  allQuiz:any
  pickEl:any
  bait:any[] = []
  preRand = 0
  randInt = 0 

  constructor(private mytool:MytoolService){}

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes["inputQuiz"] && changes["inputQuiz"].previousValue)
    {
      this.click = 0;
      this.quiz = changes["inputQuiz"].currentValue
      this.bindingQuizValue(changes["inputQuiz"].currentValue)
      if(this.pickEl)
      {
      if (this.pickEl.classList.contains("bg-danger")){
        this.pickEl.classList.remove("bg-danger")
        this.pickEl = undefined
      }
      else if (this.pickEl.classList.contains("bg-success")){
        this.pickEl.classList.remove("bg-success")
        this.pickEl = undefined
      } 
      }
      this.removeEvent()
  
      if (this.preRand !== this.randInt)
        {
          this.pickEl = undefined
          setTimeout(()=>{this.addEvent()},100)
        }
      else{
        this.addEvent();
      }
      
    }  
  }

  ngAfterViewInit(): void {
    
    this.addEvent()
   
  }
  bindingQuizValue(vocab:any){
    this.bait = []
    this.preRand = this.randInt
    this.randInt = this.mytool.getRandomInt(2)
    this.lessionVocabs = this.mytool.shuffleArray(this.lessionVocabs)
    for(let i=0;i<this.lessionVocabs.length;i++){
      if (this.lessionVocabs[i] !== vocab){
        this.bait.push(this.lessionVocabs[i])
      }
      
      if (this.bait.length === 3) break;
      
    }
    this.bait.push(vocab)
    this.bait = this.mytool.shuffleArray(this.bait)
    console.log(this.bait)
    this.quiz = this.bait
    this.question = vocab
    this.bingo = vocab.vietnamese
  }
  ngOnInit(): void {
    this.bindingQuizValue(this.inputQuiz)
  }
  outHover(event:any){
    event.target.classList.remove("bg-info")
    event.target.classList.remove("text-white")
    event.target.style.transform = "scale(1)"
  }
  hoverHandle(event:any){

    event.target.classList.add("bg-info")
    event.target.classList.add("text-white")
    event.target.style.transform = "scale(1.1)"
  }
  addEvent(){
    console.log("add hover")
    this.allQuiz = document.getElementsByClassName("quiz")
    for (let i = 0; i < this.allQuiz.length;i++){
      console.log(this.allQuiz[i].textContent)
      this.allQuiz[i].addEventListener("mouseover",this.hoverHandle)
      this.allQuiz[i].addEventListener("mouseout",this.outHover)
    }
  }
  removeEvent(){
    console.log("delete hover")
    for (let i = 0; i < this.allQuiz.length;i++){
      this.allQuiz[i].removeEventListener("mouseover",this.hoverHandle)
      this.allQuiz[i].removeEventListener("mouseout",this.hoverHandle)
    }
  }
  checkAnswer(data:any){
    console.log(data)
    if(this.click ===0){
      this.removeEvent();
      
      // console.log(event)
      // const target = event.target
      // console.log(event.target)
      
      // if(this.bingo.trim() === value){
      //   target.classList.add("bg-success")
      //   this.score += 100
      // }
      // else{   
      //   target.classList.add("bg-danger")
      // }
      if(data.vocab.trim().toLowerCase() === this.question.vocab.trim().toLowerCase())
        {
          alert("dung roi")
          this.score +=100;
        }
      this.scoreEvent.emit(this.score)
    }
    else{
      alert("vui long chuyen sang cau khac")
    }
    this.click +=1
    
  }

}
