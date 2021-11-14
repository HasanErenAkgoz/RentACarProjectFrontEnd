import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Image } from 'src/app/models/ımage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  getCarDetail: CarDetail[];
  carImages: Image[];
  defaultPath: string = 'https://localhost:44323/images/';
  defaultImage:string="default.jpg";
  dataLoaded: boolean = false;
  carDetailsLoad=false;
  controlPrev: Boolean = false;
  rentalControl = false;
  rentalMessage="";
  userIdControl:boolean=false;
  index:number=0;

  constructor(
    private carDetailService: CarDetailService,
    private carImageService: CarImagesService,
    private rentalService:RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarDetailByCarId(params["carId"]);
        this.getCarImage(params["carId"]);
        this.getCarRentalControl(params["carId"])

      } else this.dataLoaded = false;
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response) => {
      this.getCarDetail = response.data;
      this.dataLoaded = true;
      this.carDetailsLoad=response.success;

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
  getCarRentalControl(carId:number) {
    if (this.localStorageService.get("id")!=null) {
      this.userIdControl=true
    }
    this.rentalService.getRentalCarControl(carId).subscribe((response) => {
      this.rentalControl=response.success;
      this.rentalControl=true;
      this.rentalMessage=response.message;

    });
  }

}
