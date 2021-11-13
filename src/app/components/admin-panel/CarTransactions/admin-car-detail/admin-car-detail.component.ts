import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  carId: number;
  imageAddForm: FormGroup;
  imageFiles: File[];
  date: Date;
  controlPrev: Boolean = false;
  constructor(
    private carDetailService: CarDetailService,
    private carImageService: CarImagesService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private router: Router,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
        this.getCarImage(params['carId']);
        this.carId = params['carId'];
      }

    });
    this.createImageAddForm();
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      imagePath: [null],
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
      if (this.carImages.length>1){
        this.controlPrev=true;
      }
    });
  }

  carDelete(car: CarDetail) {
    this.carDetailService.carDelete(car).subscribe((response) => {
      this.toasterService.error('Silme İşlemi Başarılı');
      this.router.navigate(['/admin/cars']);
    });
  }

  uploadFile(event: any) {
    this.imageFiles = event.target.files;
  }
  addImage() {
    if (this.imageAddForm.valid) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        this.carImageService
          .upload( this.imageFiles[i],this.carId)
          .subscribe((response) => {
            this.toasterService.success(response.message)
            this.getCarImage(this.carId);
          });
      }
    }
  }

}
