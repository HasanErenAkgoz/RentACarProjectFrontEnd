import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from '../../../models/car';
import { CarDetail } from '../../../models/carDetail';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  cars:CarDetail[]=[];
  dataLoaded:boolean=false;
  defaultPath:string="https://localhost:44323/images/"
;
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars(){
    this.carService.getCars().subscribe((response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    }))
  }

}
