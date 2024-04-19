import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  response:any
  constructor(private userService:UserService, private loginService:LoginService, private router :Router){}

  ngOnInit(): void {
    var token = this.loginService.getToken()
    console.log(token)
    if (token ===null){
      this.router.navigate(['login'])
      return
    }
    this.userService.getProfile(token).subscribe(data =>{
      this.response = data  
      console.log(this.response)
      
    })


  }
}
