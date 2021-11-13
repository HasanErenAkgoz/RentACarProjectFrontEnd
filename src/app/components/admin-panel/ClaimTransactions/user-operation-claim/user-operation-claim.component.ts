import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validator,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaimDto';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-user-operation-claim',
  templateUrl: './user-operation-claim.component.html',
  styleUrls: ['./user-operation-claim.component.css'],
})
export class UserOperationClaimComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  userOperationInfo: UserOperationClaimDto[];
  userClaimUpdate: FormGroup;
  claimId: number;
  userId: number;
  operationClaim: OperationClaim[];
  userClaim: UserOperationClaimDto;
  userClaimId: number;
  constructor(
    private UserOperationClaimService: UserOperationClaimService,
    private operationClaimService: OperationClaimService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
    };
    this.GetAll();
  }

  GetAll() {
    this.UserOperationClaimService.GetAll().subscribe((respons) => {
      this.userOperationInfo = respons.data;
      this.toastrService.success(respons.message);
      this.dtTrigger.next();
    });
  }

  OperationClaimGetAll() {
    this.operationClaimService.GetAll().subscribe((response) => {
      this.operationClaim = response.data;
    });
  }
  selectUserId(claimId: number) {
    this.userClaimId = claimId;
    console.log(this.userOperationInfo[this.userClaimId]);
    localStorage.setItem('userId', '1');
  }

  Delete(UserOperationClaim: UserOperationClaimDto) {
    this.UserOperationClaimService.Delete(UserOperationClaim).subscribe(
      (response) => {
        this.toastrService.error(response.message);
      }
    );
  }
}
