import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarService } from './services/car.service';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomepageComponent},
  {path:"cars",component:CarComponent},
  {path:"carDetail/:carId",component:CarDetailComponent},
  {path:"cars/brandId",component:CarComponent},
  {path:"cars/filter/:brandId",component:CarComponent},
  {path:"peyment",component:PaymentComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
