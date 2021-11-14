import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserModel } from 'src/app/models/userModel';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaimDto';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-opertaion-claim-add',
  templateUrl: './user-opertaion-claim-add.component.html',
  styleUrls: ['./user-opertaion-claim-add.component.css']
})
export class UserOpertaionClaimAddComponent implements OnInit {

  userClaimAdd:FormGroup
  UserList:UserModel[];
  getUserOpertaionClaim:UserOperationClaimDto[]
  operationClaim:OperationClaim[]
  claimAdd:FormGroup;
  claimId:number;
  constructor(
    private userOpertaionClaim:UserOperationClaimService,
    private operationClaimService:OperationClaimService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['userClaimId']) {
        this.GetUserOperationClaim(params['userClaimId']);
      }
    });
    this.GetAll();

  }

  createUserClaimAdd(){
    this.claimAdd=this.formBuilder.group({
      userId: [this.getUserOpertaionClaim[0].userId, Validators.required],
      operationClaimId: ["", Validators.required],
      status: [true, Validators.required],

    })
  }

  GetUserOperationClaim(id: number) {
    this.userOpertaionClaim.GetById(id).subscribe((response) => {
      this.getUserOpertaionClaim = response.data;
      this.createUserClaimAdd();
      console.log(this.getUserOpertaionClaim[0])

    });
  }
  GetAll() {
    this.operationClaimService.GetAll().subscribe((responso) => {
      this.operationClaim = responso.data;
      if (this.operationClaim!=null) {
        this.toastrService.success(responso.message);

      }

    });
  }
  Add() {
      if (this.claimAdd.value && this.claimAdd.value.operationClaimId!=this.getUserOpertaionClaim[0].operationClaimId) {
        let claimModel = Object.assign({}, this.claimAdd.value);
        this.userOpertaionClaim.Add(claimModel).subscribe((response) => {
         this.toastrService.success(response.message);
        this.router.navigate(['/admin/user/useroperationclaim']);

        });
     } else {
       this.toastrService.error('Hatalı veya Eksik bir bilgi girdiniz', 'Hata');
      }

  }


}
