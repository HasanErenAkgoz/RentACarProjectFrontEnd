import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBrandListComponent } from './components/admin-panel/admin-brand-list/admin-brand-list.component';
import { AdminCarAddComponent } from './components/admin-panel/CarTransactions/admin-car-add/admin-car-add.component';
import { AdminCarDetailComponent } from './components/admin-panel/CarTransactions/admin-car-detail/admin-car-detail.component';
import { AdminCarListComponent } from './components/admin-panel/CarTransactions/admin-car-list/admin-car-list.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CarUpdateComponent } from './components/admin-panel/CarTransactions/car-update/car-update.component';
import { CustomerListComponent } from './components/admin-panel/customer-list/customer-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { CarService } from './services/car.service';
import { UserOperationClaimComponent } from './components/admin-panel/ClaimTransactions/user-operation-claim/user-operation-claim.component';
import { OperationClamComponent } from './components/admin-panel/ClaimTransactions/operation-clam/operation-clam.component';
import { OperationClaimAddComponent } from './components/admin-panel/ClaimTransactions/operation-claim-add/operation-claim-add.component';
import { UserOpertaionClaimAddComponent } from './components/admin-panel/ClaimTransactions/user-opertaion-claim-add/user-opertaion-claim-add.component';
import { UserOperationUpdateComponent } from './components/admin-panel/ClaimTransactions/user-operation-update/user-operation-update.component';
import { CarRentalComponent } from './components/admin-panel/RentalTransactions/car-rental/car-rental.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';

const routes: Routes = [
  //User Components
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'cars', component: CarComponent },
  { path: 'carDetail/:carId', component: CarDetailComponent },
  { path: 'cars/brandId', component: CarComponent },
  { path: 'cars/filter/:brandId', component: CarComponent },
  { path: 'peyment', component: PaymentComponent, canActivate: [LoginGuard] },
  //Admin Components
  {
    path: 'admin/dashboard',
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/cars',
    component: AdminCarListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/carDetail/:carId',
    component: AdminCarDetailComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/car/update/:carId',
    component: CarUpdateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/car/add',
    component: AdminCarAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/brand/Add',
    component: BrandAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/brand/brandList',
    component: AdminBrandListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/customer/customerList',
    component: CustomerListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/claim/operationclaim',
    component: OperationClamComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/claim/operationclaimadd',
    component: OperationClaimAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/user/useroperationclaim',
    component: UserOperationClaimComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/user/useroperationclaimadd',
    component: UserOpertaionClaimAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/user/useroperationclaimupdate/:userClaimId',
    component: UserOperationUpdateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/user/useroperationclaimadd/:userClaimId',
    component: UserOpertaionClaimAddComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/rental/carrental',
    component: CarRentalComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'user/userupdate',
    component: UserUpdateComponent,
    canActivate: [LoginGuard],
  },

  //Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
