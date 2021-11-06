import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  brandList: Brand[] = [];
  filterText:string="";
  empty:boolean=false;
  brandFilter:number;
  currentBrandId:number;
  dataLoaded: boolean = false;
  defaultPath: string = 'https://localhost:44323/images/';
  defaultImage: string = 'default.jpg';
  constructor(
    private carDetailService: CarDetailService,
    private brandService: BrandService,
    private activatedRout:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRout.params.subscribe(params=>{
      if(params["brandId"])
      this.getCarListBrandId(params["brandId"]);
    })
    this.getCars();
    this.getBrand();
  }
  getCars() {
    this.carDetailService.getCarsDetail().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.empty=false;
      console.log(response.message)
    });
  }
  getBrand(){
    this.brandService.getBrands().subscribe(response=>{
      this.brandList=response.data;
    })
  }
  setCurrentBrand(brandId:number)
  {
    return(brandId===this.currentBrandId?true:false)
  }

getCarListBrandId(brandId:number){
  this.carDetailService.getCarListBrandId(brandId).subscribe(response=>{
    this.cars=response.data;
    if(this.cars.length==0)
    {
this.empty=true
    }
    else
    this.empty=false;

  })
}

}
