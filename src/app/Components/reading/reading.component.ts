
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnChanges, OnInit{
  @Input() inputQuiz:any;
  @Input() score:any;
  @Output() scoreEvent = new EventEmitter()
  paragraph = ""
  question1 = ""
  question2 = ""
  an1 = ""
  an2 = ""
  click1 = 0
  click2 = 0

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["inputQuiz"] && changes["inputQuiz"].previousValue)
      {
        this.resetPrevius();

      }
  }

  ngOnInit(): void {
    console.log(this.inputQuiz)
  }


  bindingValue(inputData:any){
    this.paragraph = inputData.paragraph
    this.an1 = inputData.answer
    this.an2 = inputData.answer2
    this.question1 = inputData.question
    this.question2 = inputData.question2
  }

  resetPrevius(){
    this.click1 = 0
    this.click2 = 0
  }
  check1(){
    console.log("click _1")
    if(this.click1 > 0)
      {
        alert("da chon cau tra loi")
        return
      }
    this.click1 +=1
  }
  check2(){
    console.log("click _1")
  }

}
