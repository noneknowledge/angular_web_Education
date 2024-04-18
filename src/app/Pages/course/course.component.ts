import { Component, OnInit } from '@angular/core';
import { LessionService } from 'src/app/Services/lession.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  lessions:any
  constructor(private lessionService:LessionService){}

  ngOnInit(): void {
    this.lessionService.getAllLession().subscribe(data=>{
      this.lessions = data;
      console.log(this.lessions)
    });
  }
 
}
