import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { Model } from 'src/app/models/model';
import { BrandService } from 'src/app/services/brand.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-admin-brand-list',
  templateUrl: './admin-brand-list.component.html',
  styleUrls: ['./admin-brand-list.component.css']
})
export class AdminBrandListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  brandList:Brand[];
  modelAddForm:FormGroup;
  formBuilder:FormBuilder;
  modelList:Model[];
  selectedBrandId:number;

  constructor(private brandService:BrandService,
    private modelService:ModelService,
    private toastrService:ToastrService)
     { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.getBrands();
    this.getModels(this.selectedBrandId);
  }


  createBrandAddForm(){
    this.modelAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      modelName:["",Validators.required]
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brandList=response.data
      this.toastrService.success(response.message,"Bilgi")
      this.dtTrigger.next();

    })
  }
  getModels(selectedBrand:number){
    this.selectedBrandId=selectedBrand;
    this.modelService.getModels(this.selectedBrandId).subscribe(response=>{
      this.modelList=response.data
      console.log(this.modelList)
    })
  }


}
