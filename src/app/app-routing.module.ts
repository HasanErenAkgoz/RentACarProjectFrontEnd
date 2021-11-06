import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCarAddComponent } from './components/admin-panel/admin-car-add/admin-car-add.component';
import { AdminCarDetailComponent } from './components/admin-panel/admin-car-detail/admin-car-detail.component';
import { AdminCarListComponent } from './components/admin-panel/admin-car-list/admin-car-list.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CarUpdateComponent } from './components/admin-panel/car-update/car-update.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarService } from './services/car.service';

const routes: Routes = [
  //User Components
  {path:"",pathMatch:"full",component:HomepageComponent},
  {path:"cars",component:CarComponent},
  {path:"carDetail/:carId",component:CarDetailComponent},
  {path:"cars/brandId",component:CarComponent},
  {path:"cars/filter/:brandId",component:CarComponent},
  {path:"peyment",component:PaymentComponent},
  //Admin Components
  {path:"admin/dashboard",component:AdminPanelComponent},
  {path:"admin/cars",component:AdminCarListComponent},
  {path:"admin/carDetail/:carId",component:AdminCarDetailComponent},
  {path:"admin/car/update/:carId",component:CarUpdateComponent},
  {path:"admin/car/add",component:AdminCarAddComponent},
  {path:"brand/Add",component:BrandAddComponent},


  //Login
  {path:"login",component:LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
