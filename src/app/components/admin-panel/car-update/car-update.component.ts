import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Image } from 'src/app/models/ımage';
import { Model } from 'src/app/models/model';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carInfo: CarDetail[];
  brandList: Brand[];
  models: Model[];
  currentBrand: number;
  carUpdateForm: FormGroup;
  brandId: number;
  carId: number;
  currentBrandId: number;
  router: any;
  rentDate: string | null;
  carImages: Image[];
  defaultPath: string = 'https://localhost:44323/images/';
  constructor(
    private carService: CarService,
    private carDetailService: CarDetailService,
    private brandService: BrandService,
    private modelService: ModelService,
    private toasterService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImagesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
        this.getCarImage(params['carId']);
      }
    });
    this.getBrand();
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [this.carInfo[0].carId, Validators.required],
      plate: [this.carInfo[0].plate, Validators.required],
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      year: [this.carInfo[0].year, Validators.required],
      km: [this.carInfo[0].km, Validators.required],
      motorHp: [this.carInfo[0].motorHp, Validators.required],
      color: [this.carInfo[0].color, Validators.required],
      dailyPrice: [this.carInfo[0].dailyPrice, Validators.required],
      minFindeksScore: [this.carInfo[0].minFindeksScore, Validators.required],
      status: [true, Validators.required],
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response) => {
      this.carInfo = response.data;
      this.createCarUpdateForm();
    });
  }

  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brandList = response.data;
    });
  }
  getModels(brandId: number) {
    this.modelService.getModels(brandId).subscribe((response) => {
      this.models = response.data;
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.Update(carModel).subscribe(
        (response) => {
          this.toasterService.success(response.message, 'Başarılı');
          this.router.navigate(['/admin/cars']);
        },
        (error) => {
          if (error.error.Errors.length > 0) {
            for (let i = 0; i < error.error.Errors.length; i++) {
              this.toasterService.error(
                error.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toasterService.error('Form Bilgileriniz Eksik!', 'Hata');
      console.log(this.carUpdateForm.value);
    }
  }
  setCurrentBrand(brandId: number) {
    return brandId === this.currentBrandId ? true : false;
  }
  getCarImage(carId: number) {
    this.carImageService.getImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
