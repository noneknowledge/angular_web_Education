import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { tokenResponse } from 'src/app/Models/tokenResponse';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userLogin:UserService, private loginService:LoginService, private router: Router ){}
  
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  public SubmitData(){
    if (this.loginForm.invalid){
      alert("so dien thoai co 10 so, hoac co the 1 truong nao do da sai")
      console.log('sai dữ liệu: ')
      
    } 
    else
    {
      this.userLogin.login(this.loginForm.value).subscribe((data:tokenResponse)=>{
    
        this.loginService.setToken(data)
        console.log("tokenResponse")
        
        console.log(data)
        console.log(data.userName)
        console.log("tokenResponse")
        this.router.navigate(['home'])
        
      },
    error=>{
      console.log(error.message)
    })
    }
    
  }
}
