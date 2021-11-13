import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim-add',
  templateUrl: './operation-claim-add.component.html',
  styleUrls: ['./operation-claim-add.component.css']
})
export class OperationClaimAddComponent implements OnInit {

  claimAddForm: FormGroup;

  constructor(private operationClaimService: OperationClaimService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createClaimAdd();
  }
  createClaimAdd() {
    this.claimAddForm = this.formBuilder.group({
      name: ['', Validators.required],

    });
  }
  Add() {
    if (this.claimAddForm.valid) {
      let carModel = Object.assign({}, this.claimAddForm.value);
      this.operationClaimService.Add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (ResponsError) => {
          if (ResponsError.error.Errors.length > 0) {
            for (let i = 0; i < ResponsError.error.Errors.length; i++) {
              this.toastrService.error(
                ResponsError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Hatalı bilgi girdiniz', 'Hata');
      console.log(this.claimAddForm.value);
    }
  }

}
