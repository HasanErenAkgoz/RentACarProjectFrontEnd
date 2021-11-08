import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Image } from 'src/app/models/ımage';
import { Model } from 'src/app/models/model';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-admin-car-add',
  templateUrl: './admin-car-add.component.html',
  styleUrls: ['./admin-car-add.component.css'],
})
export class AdminCarAddComponent implements OnInit {
  carInfos: CarDetail[];
  brandList: Brand[];
  models: Model[];
  carAddForm: FormGroup;
  router: any;
  carImages: Image[];
  defaultPath: string = 'https:localhost:44323/images/';
  brandId:number=1;
  currentBrandId: number;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private modelService: ModelService,
    private toasterService: ToastrService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {

      this.getBrand();
      this.createCarAddForm();

  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      plate: ["", Validators.required],
      brandId: [1,Validators.required],
      modelId: [1, Validators.required],
      year: ["", Validators.required],
      km: ["", Validators.required],
      motorHp: ["", Validators.required],
      color: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      minFindeksScore: ["", Validators.required],
      status: [true, Validators.required],
    });
  }
  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brandList = response.data;
    });
  }
  getModels(brandId:number) {

    this.modelService.getModels(brandId).subscribe((response) => {
      this.models = response.data;
     });
  }

   carAdd() {
    if (this.carAddForm.valid) {
       let carModel = Object.assign({}, this.carAddForm.value);
       this.carService.Add(carModel).subscribe(
         (response) => {
           this.toasterService.success(response.message, 'Başarılı');
         },
         (ResponsError) => {
           if (ResponsError.error.Errors.length > 0) {
             for (let i = 0; i < ResponsError.error.Errors.length; i++) {
               this.toasterService.error(
                ResponsError.error.Errors[i].ErrorMessage,
                 'Doğrulama hatası'
               );
             }
           }
         }
       );
     } else {
       this.toasterService.error('Form Bilgileriniz Eksik!', 'Hata');
       console.log(this.carAddForm.value);
     }
     console.log("deneme");
   }

}
