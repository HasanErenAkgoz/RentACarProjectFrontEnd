import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerInfo } from 'src/app/models/customerInfo';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  customerList: CustomerDetail[] = [];
  constructor(
    private customerService: CustomerService,
    private toastriService: ToastrService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.getCustomer();

  }
  getCustomer() {
    this.customerService.getCustomer().subscribe((response) => {
      this.customerList = response.data;
      this.dtTrigger.next();
      this.toastriService.success(response.message);


    });
  }
  customerDelete(customer: CustomerDetail) {
    this.customerService.Delete(customer).subscribe((response) => {
      this.toastriService.error('Silme İşlemi Başarılı');
      this.getCustomer();
      this.toastriService.success(response.message);

    });
  }
}
