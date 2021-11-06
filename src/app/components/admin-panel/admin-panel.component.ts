import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  totolCarCount: number;
  mostExpensiveCarPlate:number;
  topSellingVehiclePlate:string;
  cheapestCarPlate:string;
  numberofRentedVehicles:number;
  totalNumberofCustomers:number;
  totalMonthlyExpense:number;
  constructor(private statistcsService: StatisticsService) {}

  ngOnInit(
  ): void {

   this.TotolCarCount();

   this.NumberofRentedVehicles();
   this.TotalNumberofCustomers();
   this.TotalMonthlyExpense();
  }

  TotolCarCount() {
    this.statistcsService.TotolCarCount().subscribe(response=>{
      this.totolCarCount=response
    });
    };

    NumberofRentedVehicles(){
      this.statistcsService.NumberofRentedVehicles().subscribe(response=>{
        this.numberofRentedVehicles=response;
      })
    }
    TotalNumberofCustomers(){
      this.statistcsService.TotalNumberofCustomers().subscribe(response=>{
        this.totalNumberofCustomers=response;
      })
    }

    TotalMonthlyExpense(){
  this.statistcsService.TotalMonthlyExpense().subscribe(response=>{
  this.totalMonthlyExpense=response;
      });
    }

  }
