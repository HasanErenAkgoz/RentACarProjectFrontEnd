import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { UserModel } from 'src/app/models/userModel';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  customer: CustomerDetail;
  user: UserModel = new UserModel();
  userForm: FormGroup;
  customerForm: FormGroup;

  userId: any;
  constructor(
    private customerService: CustomerService,
    private userSerice: UserService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId=this.localStorageService.get("id");
      this.createUserForm()
      this.createCustomerForm()
      this.getUser();
      this.getCustomer();

  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
    })
  }

  createCustomerForm(){
    this.customerForm = this.formBuilder.group({
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      status: [true],

    })
  }

  getUser(){
    this.userSerice.GetById(this.userId).subscribe(response => {
      this.user = response.data
      this.userForm.patchValue(response.data)
    })
  }

  getCustomer(){
    this.customerService.GetById(this.userId).subscribe(response => {
      this.customer = response.data
      this.customerForm.patchValue(response.data)
    })
  }

  updateCustomer(){
    if(this.customerForm.valid){
      this.customerForm.addControl("id",new FormControl(this.customer.id))
      this.customerForm.addControl("userId",new FormControl(this.customer.userId))
      this.customerForm.addControl("FindeksScore",new FormControl(this.customer.findeksScore))
      let customerModel = Object.assign({},this.customerForm.value)
      this.customerService.update(customerModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      },responseError => {
        this.toastrService.error("Hata","hata")
      })
    }else{
      this.toastrService.error("Tüm alanları doldurmanız gerekli","Hata")
    }
  }
  updateUser(){
    if(this.userForm.valid){
      this.userForm.addControl("id",new FormControl(this.user.id))
      let userModel = Object.assign({},this.userForm.value)
      this.userSerice.update(userModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      })
    }else{
      this.toastrService.error("Tüm alanları doldurmanız gerekli","Hata")
    }

  }

  // updatePassword(){
  //   const ref = this.dialogService.open(ChangePasswordComponent, {
  //     header: 'Şifre güncelle',
  //     width: '20%'
  //   });
  // }
  deneme(){
    console.log(this.userForm.value);
    console.log(this.customerForm.value);


  }
}
