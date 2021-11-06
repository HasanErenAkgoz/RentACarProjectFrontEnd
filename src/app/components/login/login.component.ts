import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder  } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup
  constructor( private formBuilerder:FormBuilder,
    private authService:AuthService,
    private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilerder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if (this.loginForm.valid){
      console.group(this.loginForm.value)
      let loginModel=Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        console.log(response)
        this.toasterService.success(response.message)
        localStorage.setItem("token",response.data.token)
      },responseError=>{
        this.toasterService.error(responseError.error)
      })
    }
  }
}
