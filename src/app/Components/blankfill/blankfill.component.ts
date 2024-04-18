import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-blankfill',
  templateUrl: './blankfill.component.html',
  styleUrls: ['./blankfill.component.css']
})
export class BlankfillComponent implements OnInit,OnChanges{
  @Input() inputQuiz:any;
  @Input() score:any;
  @Output() scoreEvent = new EventEmitter()

  click=0
  fillWord:any
  question:any
  inputAnswer = ""

  ngOnInit(): void {
    this.bindingValue(this.inputQuiz);

  }
  bindingValue(inputData:any){
    this.question = inputData.blankSentence.split(" ")
    this.fillWord = inputData.fillWord
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("fill changes")
    if(changes["inputQuiz"] && changes["inputQuiz"].previousValue){
      this.inputAnswer = ""
      this.click = 0;
      this.bindingValue(changes["inputQuiz"].currentValue)
    }
  }

  checkAnswer(){
    console.log("click")
    if(this.click===0)
    {
      this.click +=1
      console.log(this.inputAnswer)
      console.log(this.fillWord)
      if(this.inputAnswer.trim().toLowerCase() === this.fillWord.trim().toLowerCase()){
        this.score += 100
        this.scoreEvent.emit(this.score)
      }
    }
    
  }
}
