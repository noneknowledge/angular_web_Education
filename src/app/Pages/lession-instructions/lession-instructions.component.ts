import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessionService } from 'src/app/Services/lession.service';
import { Router } from '@angular/router';
import { SpeakService } from 'src/app/Services/speak.service';

@Component({
  selector: 'app-lession-instructions',
  templateUrl: './lession-instructions.component.html',
  styleUrls: ['./lession-instructions.component.css']
})
export class LessionInstructionsComponent implements OnInit {
  lessionId:any
  response:any
  currentTab = "Vocab"
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice:number = 0

  constructor(private service:LessionService, private route:ActivatedRoute, private navigate:Router, private speakService:SpeakService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.lessionId = params.get('id')
      console.log(this.lessionId)
      console.log("id")
      this.service.getLessionInstruction(this.lessionId).subscribe(response=>{
        if (response ===null){
          alert("khong tim thay cai nay")
          this.navigate.navigate(["/"])
        }
        this.response = response
        console.log(this.response)
        setTimeout(()=>{this.voices = this.speakService.getVoices()},100)
      },error=>{
        console.warn(error.message)
      })
    })
  }
  changeTab(event:any){
    this.currentTab = event.target.innerHTML 
  }

  speak(word:string){
    this.speakService.speak(word,this.selectedVoice)
  }
}
