import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';


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
      this.userLogin.login(this.loginForm.value).subscribe(data=>{
        this.loginService.setUserName(this.loginForm.controls['username'].value)
        this.loginService.setToken(data)
        this.router.navigate(['home'])
        
      },
    error=>{
      console.log(error.message)
    })
    }
    
  }
}
