import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaimDto';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-user-operation-update',
  templateUrl: './user-operation-update.component.html',
  styleUrls: ['./user-operation-update.component.css'],
})
export class UserOperationUpdateComponent implements OnInit {
  userClaimUpdateForm: FormGroup;
  getUserOpertaionClaim: UserOperationClaimDto[];
  operationClaim: OperationClaim[];
  claimId: number;

  constructor(
    private userOpertaionClaim: UserOperationClaimService,
    private operationClaimService: OperationClaimService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['userClaimId']) {
        this.GetUserOperationClaim(params['userClaimId']);

      }
    });
    this.GetAll();
  }
  createUserClaimUpdateForm() {
    this.userClaimUpdateForm = this.formBuilder.group({
      id: [this.getUserOpertaionClaim[0].id, Validators.required],
      userId: [this.getUserOpertaionClaim[0].userId, Validators.required],
      operationClaimId: [this.claimId, Validators.required],
      status: [true, Validators.required],
    });
  }

  GetUserOperationClaim(id: number) {
    this.userOpertaionClaim.GetById(id).subscribe((response) => {
      this.getUserOpertaionClaim = response.data;
      console.log(this.getUserOpertaionClaim)
      this.createUserClaimUpdateForm();

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

  Update() {
    if (this.userClaimUpdateForm.value) {
      let claimModel = Object.assign({}, this.userClaimUpdateForm.value);
      this.userOpertaionClaim.Update(claimModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.router.navigate(['/admin/user/useroperationclaim']);

      });
    } else {
      this.toastrService.error('Hatalı bilgi girdiniz', 'Hata');
    }
    console.log(this.userClaimUpdateForm.value);
  }
}
