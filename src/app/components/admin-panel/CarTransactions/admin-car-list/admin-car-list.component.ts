import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
declare const $:any;
@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.css'],
})
export class AdminCarListComponent implements OnInit {
  carList: CarDetail[];
  defaultPath: string = 'https://localhost:44323/images/';
  defaultImage: string = 'default.jpg';
  filterText: string = '';
  empty: boolean = false;
  currentBrandId: number;
  brandFilter: number;
  brandList: Brand[];
  dtOptions: DataTables.Settings = {};
  constructor(
    private carDetailService: CarDetailService,
    private httpGet: HttpClient,
    private activatedRout: ActivatedRoute,
    private brandService: BrandService,
    private toasterService:ToastrService,
  ) {}


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      processing: true
    };
    this.activatedRout.params.subscribe((params) => {
      if (params['brandId']) this.getCarListBrandId(params['brandId']);
    });
    this.getCars();
    this.getBrand();
    this.httpGet.get('http://jsonplaceholder.typicode.com/posts')
    .subscribe(response => {
      response = this.carList;
  });
  }

  getCars() {
    this.carDetailService.getCarsDetail().subscribe((response) => {
      if (response) {
        this.carList = response.data;
        this.empty=false;
        this.toasterService.success(response.message);
      }
    });
  }
  setCurrentBrand(brandId: number) {
    return brandId === this.currentBrandId ? true : false;
  }

  getCarListBrandId(brandId: number) {
    this.carDetailService.getCarListBrandId(brandId).subscribe((response) => {
      this.carList = response.data;
      if (this.carList.length == 0) {
        this.empty = true;
      } else this.empty = false;
    });
  }
  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      if (response) {
        this.brandList = response.data;
      }
    });
  }
}
