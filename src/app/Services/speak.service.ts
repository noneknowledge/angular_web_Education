import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakService {

  private synth = window.speechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];


  constructor() { 
    this.loadVoices();
    
  }
  
  getVoices(){
    return this.voices
  }

  private loadVoices() {
    if (typeof window.speechSynthesis === 'undefined') {
      return;
    }
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
       
      };
    }
  }

  speak(text: string,voiceIndex:number): void {
    const utterance = new SpeechSynthesisUtterance(text);   
     utterance.voice = this.voices[voiceIndex];
    window.speechSynthesis.speak(utterance);
  }
}
