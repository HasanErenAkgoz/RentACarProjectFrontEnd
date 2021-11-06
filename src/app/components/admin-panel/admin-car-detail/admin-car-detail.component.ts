import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Image } from 'src/app/models/ımage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';

@Component({
  selector: 'app-admin-car-detail',
  templateUrl: './admin-car-detail.component.html',
  styleUrls: ['./admin-car-detail.component.css'],
})
export class AdminCarDetailComponent implements OnInit {
  getCarDetail: CarDetail[];
  carImages: Image[];
  defaultPath: string = 'https://localhost:44323/images/';
  defaultImage: string = 'default.jpg';
  index: number = 0;
  carUpdateForm: FormGroup;
  formBuilder: any;
  carId: number;
  constructor(
    private carDetailService: CarDetailService,
    private carImageService: CarImagesService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
        this.getCarImage(params['carId']);
        this.carId = params['carId'];
        console.log(this.carImages[0].imagePath);
      }
    });
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [this.getCarDetail[0].carId, Validators.required],
      plate: [this.getCarDetail[0].plate, Validators.required],
      brandId: [this.getCarDetail[0].brandId, Validators.required],
      modelId: [this.getCarDetail[0].modelId, Validators.required],
      year: [this.getCarDetail[0].year, Validators.required],
      km: [this.getCarDetail[0].km, Validators.required],
      motorHp: [this.getCarDetail[0].motorHp, Validators.required],
      color: [this.getCarDetail[0].color, Validators.required],
      dailyPrice: [this.getCarDetail[0].dailyPrice, Validators.required],
      minFindeksScore: [
        this.getCarDetail[0].minFindeksScore,
        Validators.required,
      ],
      status: [true, Validators.required],
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response) => {
      this.getCarDetail = response.data;
    });
  }
  getCarImage(carId: number) {
    this.carImageService.getImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  carDelete(car: CarDetail) {
    this.carDetailService.carDelete(car).subscribe((response) => {
      this.toasterService.error('Silme İşlemi Başarılı');
      this.router.navigate(['/admin/cars']);
    });
  }


}
