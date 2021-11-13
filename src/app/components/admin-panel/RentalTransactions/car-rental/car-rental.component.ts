import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css'],
  providers: [DatePipe],
})
export class CarRentalComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  rentalList: RentalDetail[];
  totalPrice: number = 0;
  totalDay: number = 0;
  date: Date;
  constructor(
    private rentalSerice: RentalService,
    private toastrService: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };

    this.GetAll();
  }

  GetAll() {
    this.rentalSerice.getRentalDetails().subscribe((response) => {
      this.rentalList = response.data;
      this.dtTrigger.next();

      if (this.rentalList != null) {
        this.toastrService.success(response.message);
      }
    });
  }

  update(rentals: RentalDetail) {
    var date = new Date();
    var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);

     rentals.returnDate=firstDayOfMonth
    this.rentalSerice.Update(rentals).subscribe((response) => {
       this.toastrService.warning(response.message);
     });
    console.log(firstDayOfMonth)
  }

}
