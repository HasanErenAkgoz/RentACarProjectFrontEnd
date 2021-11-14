import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerInfo } from 'src/app/models/customerInfo';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [DatePipe],
})
export class RentalAddComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;

  @Input() car: CarDetail[];
  customers: CustomerDetail;
  customerInfoId: number;
  rentalAddForm: FormGroup;
  closeAddExpenseModal: any;
  minDate: string | null;
  rentDate: string | null;
  rentEndDate: string | null;
  date: Date;
  totalPrice: number = 0;
  totalDay: number = 1;
  findeksLoad: boolean = true;
  findeksError: boolean = true;
  findeksMsg: string;
  userId: any;
  constructor(
    private customerService: CustomerService,
    private findeksService: FindexService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.localStorageService.get('id');
    this.GetById();
    this.dateApply();
    this.createProductAddForm();
    this.priceCalculator();
  }

  createProductAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carInfoId: [this.car[0].carId, Validators.required],
      rentDate: [this.minDate, Validators.required],
      rentEndDate: [this.minDate, Validators.required],
      customerInfoId: ['', Validators.required],
      dailyPrice: [
        this.car[0].dailyPrice + (this.car[0].dailyPrice * 18) / 100,
        Validators.required,
      ],
      totalPrice: [this.totalPrice, Validators.required],
      totalDay: [1, Validators.required],
    });
  }

  dateApply() {
    this.date = new Date();
    this.rentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.rentEndDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.minDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.rentDate = event.target.value;
  }

  rentEndChangeEvent(event: any) {
    this.rentEndDate = event.target.value;
    this.priceCalculator();
  }
  priceCalculator() {
    if (this.rentDate != null && this.rentEndDate != null) {
      var date1 = new Date(this.rentEndDate);
      var date2 = new Date(this.rentDate);

      var difference = date1.getTime() - date2.getTime();
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalDay = numberOfDays + 1;
      this.totalPrice =
        this.totalDay *
        (this.car[0].dailyPrice + (this.car[0].dailyPrice * 18) / 100);
    }
  }
  paymentRoute() {
    if (this.rentalAddForm.valid) {
      localStorage.setItem(
        'payment-data',
        JSON.stringify(this.rentalAddForm.value)
      );
      this.closeModal.nativeElement.click();
      this.toastr.warning('Ödeme sayfasına yönlendiriliyosunuz');
      this.router.navigate(['/peyment']);
    } else {
      this.toastr.error('Form Hatalı');
    }
  }

  GetById() {
    this.customerService.GetById(Number(this.userId)).subscribe((response) => {
      this.customers = response.data;
      this.findeksLoad = false;
      this.findeksService
        .FindexQuery(this.car[0].carId, this.customers.id)
        .subscribe((response) => {
          if (response.success) {
            this.findeksLoad = true;
          } else {
            this.findeksError = false;
            this.findeksMsg = 'Findex Puanı Yetersiz';
            this.findeksLoad = false;
            this.toastr.error('Findex Puanı Yetersiz');
          }
        });
    });
  }
}
