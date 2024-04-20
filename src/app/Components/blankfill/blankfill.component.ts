import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SpeakService } from 'src/app/Services/speak.service';

@Component({
  selector: 'app-blankfill',
  templateUrl: './blankfill.component.html',
  styleUrls: ['./blankfill.component.css']
})
export class BlankfillComponent implements OnInit,OnChanges{
  @Input() inputQuiz:any;
  @Input() score:any;
  @Output() scoreEvent = new EventEmitter()
  
  selectedVoice:number = 0
  click=0
  fillWord:any
  question:any
  inputAnswer = ""
  hintImage = ""
  hintVoice = ""
  voices: SpeechSynthesisVoice[] = [];

  constructor(private speakService:SpeakService){}

  ngOnInit(): void {
    console.log(this.inputQuiz)
    setTimeout(()=>{this.voices = this.speakService.getVoices()},100)
    this.bindingValue(this.inputQuiz);

  }
  speak(){
    this.speakService.speak(this.hintVoice,this.selectedVoice)
  }
  bindingValue(inputData:any){
    this.hintImage = inputData.hint
    var text = inputData.blankSentence.replace("_",inputData.fillWord)
    this.hintVoice = text
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
    if (this.click > 0) alert("vui long chuyen cau hoi")
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
