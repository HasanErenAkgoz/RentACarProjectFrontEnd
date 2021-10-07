import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Image } from 'src/app/models/ımage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  getCarDetail: CarDetail;
  carImages: Image[];
  defaultPath: string = 'https://localhost:44323/images/';
  dataLoaded: boolean = false;
  controlPrev: Boolean = false;
  constructor(
    private carDetailService: CarDetailService,
    private carImageService: CarImagesService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
        this.getCarImage(params['carId']);
      } else this.dataLoaded = false;
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response) => {
      this.getCarDetail = response.data;
      this.dataLoaded = true;
    });
  }
  getCarImage(carId: number) {
    this.carImageService.getImages(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
     if (this.carImages.length>1){
       this.controlPrev=true;
     }
    });
  }

  addToCart(car:CarDetail){
    this.toastrService.success("Araç Sepete Eklendi",car.brandName+" "+car.modelName)
  }

}
