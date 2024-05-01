import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MytoolService {

  constructor() { }
  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  scrollTop(){
    console.log("scoorl")
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'instant' 
    });
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
