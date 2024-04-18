import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakService {

  constructor() { }
  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);   
    window.speechSynthesis.speak(utterance);
  }
}
