import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-clam',
  templateUrl: './operation-clam.component.html',
  styleUrls: ['./operation-clam.component.css'],
})
export class OperationClamComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  operationClaim: OperationClaim[];
  claimUpdateForm: FormGroup;
  ClaimId:number;
  constructor(
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
    this.createClaimUpdate();
  }

  GetAll() {
    this.operationClaimService.GetAll().subscribe((responso) => {
      this.operationClaim = responso.data;
      this.toastrService.success(responso.message);
      if (this.operationClaim===null) {
        this.dtTrigger.next();
      }
    });
  }
  createClaimUpdate() {
    this.claimUpdateForm = this.formBuilder.group({
      id: [this.ClaimId, Validators.required],
      name: ["",Validators.required],

    });
  }
  Delete(operationClaim:OperationClaim){
    this.operationClaimService.Delete(operationClaim).subscribe(response=>{
      this.toastrService.error(response.message)
      this.GetAll();
    })
  }
  selectedClaim(selectedClaimId:number){

      this.ClaimId=selectedClaimId
  }
  Update() {
     if (this.claimUpdateForm.value) {
       let carModel = Object.assign({}, this.claimUpdateForm.value);
       this.operationClaimService.Update(carModel).subscribe(
         (response) => {
           this.toastrService.success(response.message);
           this.GetAll();

         }
       )
     }
     else
     {
       this.toastrService.error('Hatalı bilgi girdiniz', 'Hata');
   }
  }
}
