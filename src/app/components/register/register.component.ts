import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilerder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilerder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      findeksScore:['',Validators.required],
      phoneNumber:['',Validators.required],
      address:['',Validators.required]
    });
  }

  register(){
    if (this.registerForm.valid){
      console.group(this.registerForm.value)
      let loginModel=Object.assign({},this.registerForm.value);
      this.authService.register(loginModel).subscribe(response=>{
        console.log("Response "+response)
        this.toastrService.success("Tebrikler! Kayıt İşlemi Tamamlandı");
        localStorage.setItem("token",response.data.token)
        this.router.navigate(["login"])
      },(responseError)=>{
        this.toastrService.error(responseError.message)
      })
    }
  }
  }
