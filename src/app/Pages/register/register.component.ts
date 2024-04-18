import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService:UserService, private router: Router){}
  
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password: ['',[Validators.required]],
      fullName: ['',[Validators.required]],
      dateOfBirth: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required, Validators.pattern("[0-9]{10}")]]
    });
  }

  public SubmitData(){
    if (this.registerForm.invalid)
      {
       

        console.log('sai dữ liệu: ')
      } 
    else
    {

      var payload = {
        userName:this.registerForm.controls['username'].value,
        passWord:this.registerForm.controls['password'].value,
        email:this.registerForm.controls['email'].value,
        fullName:this.registerForm.controls['fullName'].value,
        phone: this.registerForm.controls['phone'].value, 
        dateOfBirth: this.registerForm.controls['dateOfBirth'].value
      }
      console.log(payload)
      this.loginService.register(this.registerForm.value).subscribe(response=>{
        alert("Đăng ký thành công. ")
        this.router.navigate(['login'])

      })
      console.log("dữ liệu từ form: ",this.registerForm.value)
    }
   
  }
}
