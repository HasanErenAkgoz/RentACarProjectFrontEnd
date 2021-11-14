import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NameStock } from 'src/app/models/nameStock';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  totolCarCount: number;
  numberofRentedVehicles: string;
  totalNumberofCustomers: number;
  totalMonthlyExpense: number;
  nameStockDashBoard: NameStock;
  totalBrandCount: string;
  totalModelCount: number;
  totalMoneyEarned: number;
  constructor(private statistcsService: StatisticsService) {}


  ngOnInit(): void {
    this.load();
  }

  load() {
    this.TotolCarCount();
    this.NumberofRentedVehicles();
    this.TotalNumberofCustomers();
    this.NameStockDashBoard();
    this.TotalBrandCount();
    this.TotalModelCount();
    this.TotalMoneyEarned();

  }

  TotolCarCount() {
    this.statistcsService.TotolCarCount().subscribe((response) => {
      this.totolCarCount = response;
    });
  }

  NumberofRentedVehicles() {
    this.statistcsService.NumberofRentedVehicles().subscribe((response) => {
      this.numberofRentedVehicles = response;
    });
  }
  TotalNumberofCustomers() {
    this.statistcsService.TotalNumberofCustomers().subscribe((response) => {
      this.totalNumberofCustomers = response;
    });
  }

  NameStockDashBoard() {
    this.statistcsService.NameStockDashBoard().subscribe((response) => {
      this.nameStockDashBoard = response;
    });
  }

  TotalBrandCount() {
    this.statistcsService.TotalBrandCount().subscribe((response) => {
      this.totalBrandCount = response;
    });
  }

  TotalModelCount() {
    this.statistcsService.TotalModelCount().subscribe((response) => {
      this.totalModelCount = response;
    });
  }

  TotalMoneyEarned() {
    this.statistcsService.TotalMoneyEarned().subscribe((response) => {
      this.totalMoneyEarned = response;
    });
  }



}
