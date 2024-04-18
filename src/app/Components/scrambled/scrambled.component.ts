import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AnswerValue } from 'src/app/AnswerValue';

@Component({
  selector: 'app-scrambled',
  templateUrl: './scrambled.component.html',
  styleUrls: ['./scrambled.component.css']
})


export class ScrambledComponent implements AfterViewInit, OnChanges, OnInit {
  @Input() inputQuiz:any;
  @Input() score:any;
  @Output() scoreEvent = new EventEmitter()

  
  textClass = ["d-inline","border","p-2","position-absolute","rounded","moveAnimate","h1-clickable","shadow"]
  sentenceArr:any
  scrambledSen:any
  toRect:any
  fromRect:any
  eContainer:any
  trueAn:any
  answer:AnswerValue[] = []

  ngOnInit(): void {
    this.bindingValue(this.inputQuiz)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["inputQuiz"] && changes["inputQuiz"].previousValue)
      {
        
        this.bindingValue(changes['inputQuiz'].currentValue);
        this.reset();
        this.createText();
      }
  }

  

  ngAfterViewInit(): void {
    this.toRect = document.getElementById("toBar")?.getBoundingClientRect()
    this.fromRect = document.getElementById("fromBar")?.getBoundingClientRect()
    this.eContainer = document.getElementById("text-container")

    this.createText()
  }

  checkAnswer(){
    this.clearListener()
    var finalAnswer = this.answer.map(a=>a.value).join(" ").trim()
   
    
    if(this.trueAn === finalAnswer)
    {
     
      for (let i = 0 ; i < this.answer.length;i++){
        this.answer[i].el.classList.add("bg-success")
      }

      this.score +=100
      this.scoreEvent.emit(this.score)
      return
    }
    else{
      for (let i = 0 ; i < this.answer.length;i++){
        this.answer[i].el.classList.add("bg-danger")
      }
    }
  }

  reset(){
    this.destroyText();
    this.answer = [];
  }
  destroyText(){
    this.eContainer.innerHTML = ""
    // var textEl = document.querySelectorAll(".h1-clickable")
    // textEl.forEach(a=>{
    //   a.remove(); console.log(a.innerHTML)})
    
  }
  createText(){
    var previousElement:HTMLHeadingElement | undefined
    
    // var index = -1
    if(this.sentenceArr){
      this.sentenceArr.forEach( (text:string) => {
        // index++
        var quiz = document.createElement("h1");
        this.textClass.forEach( a=>{
            quiz.classList.add(a)
        })
        if(!previousElement){
            quiz.style.left = `${this.fromRect.left + 2}px`;
            quiz.style.top = `${this.fromRect.top+ 2}px`;      
        }
        else{
          var elBefore = previousElement!.getBoundingClientRect();
          var predictRight = 100 + elBefore.right
         
          if(predictRight > this.fromRect.right)
          { 
              quiz.style.left = `${this.fromRect.left + 2}px`;
              quiz.style.top = `${elBefore.bottom + 2 }px`;
          }
          else{
              quiz.style.left = `${elBefore.right+2}px`;
              quiz.style.top = `${elBefore.top}px`;
          }         
      } 
      quiz.innerHTML= text
      quiz.addEventListener("click", (event) => this.textClicked(event))
      quiz.addEventListener("mouseover", this.hoverTest)
      quiz.addEventListener("mouseout",this.outTest)

      previousElement = quiz;
      this.eContainer.appendChild(quiz)   
        
      });
    }
  }
  hoverTest(e:any){
    e.target.classList.add("bg-info")
   
  }
  outTest(e:any){
    e.target.classList.remove("bg-info")
    
  }

  textClicked(event:any){

 
    var elementVal = event.target.innerHTML
        if (this.answer.find(a=>a.value === elementVal))
        {
            event.target.style.transform = `translate(0px,0px)`
            this.realignElement(event.target)
       
        }
        else{
            var currentPos = event.target.getBoundingClientRect();
            var moveX
            var moveY
            if (this.answer.length === 0){
                moveY =- currentPos.top + this.toRect.top +5 
                moveX = -(currentPos.left - this.toRect.left - 5)
             
                event.target.style.transform = `translate(${moveX}px,${moveY}px)`
            }
            else{
                var previousAnswer = this.answer[this.answer.length-1].el
                var prePos = previousAnswer.getBoundingClientRect();

                var predictRight = currentPos.width + prePos.right
                
                if(predictRight > this.toRect.right)
                { 
                  
                    moveY =  -(currentPos.top - prePos.bottom -5 )
                    moveX = -(currentPos.left - this.toRect.left - 5)
                }
                else{
                    moveY =  -(currentPos.top - prePos.top )
                    moveX = -(currentPos.left - prePos.right - 5)
                }
                event.target.style.transform = `translate(${moveX}px,${moveY}px)`
            }
            this.answer.push({el:event.target,value:elementVal})
            
        }
        
  }

  clearListener(){
    var allText = document.getElementsByClassName("h1-clickable")
    for (let i = 0; i<allText.length;i++){
      
        allText[i].removeEventListener("mouseover", this.hoverTest)
        allText[i].removeEventListener("mouseout", this.outTest)
    }
}

  async realignElement(item:HTMLHeadingElement){

    if(item === this.answer[this.answer.length-1].el)
    {
      this.answer = this.answer.filter(a=>a.value !==item.innerHTML)
      return
    }
    var startIn = this.answer.findIndex(a=>a.el === item)
    this.answer = this.answer.filter(a=>a.value !==item.innerHTML)
    for (startIn;startIn<this.answer.length;startIn++){
      var prePos
      if(startIn ===0){
        prePos = {right: this.toRect.left,top: this.toRect.top}
    }
    else{
        prePos = this.answer[startIn-1].el.getBoundingClientRect();
    }
    var currEl = this.answer[startIn].el
    var currentPos =  currEl.getBoundingClientRect();

    var predictRight = currentPos.width + prePos.right                     
    var moveX 
    var moveY 
    if(predictRight > this.toRect.right)
    { 
        moveY =  -(parseInt(currEl.style.top, 10)  - prePos.bottom! -5 )
        moveX = -(parseInt(currEl.style.left, 10) - this.toRect.left - 5)
    }
    else{
        moveY =  -(parseInt(currEl.style.top, 10) - prePos.top )
        moveX = -(parseInt(currEl.style.left, 10) - prePos.right - 5)
    }
    currEl.style.transform = `translate(${moveX}px,${moveY}px)`
    // doi cho transition xong 
    await new Promise(r => setTimeout(r, 150));
    }
  }

  bindingValue(inputValue:any){
    
    this.trueAn = inputValue.blankSentence.replace("_",inputValue.fillWord)
    this.sentenceArr = this.shuffleArray(this.trueAn.split(" "))  
    this.scrambledSen = this.sentenceArr.join(" ")

  }

  

  shuffleArray(array:any) {
    var m = array.length, t, i;
 
    while (m) {    
     i = Math.floor(Math.random() * m--);
     t = array[m];
     array[m] = array[i];
     array[i] = t;
    }
 
   return array;
 }

}
