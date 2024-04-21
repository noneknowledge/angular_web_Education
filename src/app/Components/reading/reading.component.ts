
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
  mystring = 'Dòng 1\nDòng 2';
  chosenEl:any[] = []

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["inputQuiz"] && changes["inputQuiz"].previousValue)
      {
        this.resetPrevious();
        this.bindingValue(this.inputQuiz)
      }
  }

  ngOnInit(): void {
    console.log(this.inputQuiz)
    this.bindingValue(this.inputQuiz)
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

  bindingValue(inputData:any){
    this.paragraph = inputData.paragraph
    this.an1 = inputData.answer
    this.an2 = inputData.answer2
    this.question1 = inputData.question
    this.question2 = inputData.question2
  }

  resetPrevious(){
    this.click1 = 0
    this.click2 = 0
    var removeClass = ['bg-success','bg-danger']
    this.chosenEl.forEach(el=>{
      for (let i = 0; i<removeClass.length;i++){
        if(el.classList.contains(removeClass[i]))
          {
            el.classList.remove(removeClass[i])
          }
      }
    })
  }
  check1(event:any){
    console.log("click _1")
    if(this.click1 > 0)
      {
        alert("da chon cau tra loi")
        return
      }

    var el = event.target
    this.chosenEl.push(el)
    this.click1 +=1
    var choseVal = el.innerHTML.toLowerCase();
    if (this.an1.toLocaleLowerCase() === choseVal){
      el.classList.add("bg-success")
      this.score +=100
      this.scoreEvent.emit(this.score)
    }
    else{
      el.classList.add("bg-danger")
    }
  }

  
  check2(event:any){
    if(this.click2 > 0)
      {
        alert("da chon cau tra loi")
        return
      }
    console.log("click _1")
    this.click2 += 1
    var el = event.target
    this.chosenEl.push(el)
    var choseVal = el.innerHTML.toLowerCase();
    if (this.an2.toLocaleLowerCase() === choseVal){
      el.classList.add("bg-success")
      this.score +=100
      this.scoreEvent.emit(this.score)
    }
    else{
      el.classList.add("bg-danger")
    }
    this.scoreEvent.emit(this.score)
  }

}
