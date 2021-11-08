import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ServiceComponent } from './components/pages/service/service.component';
import { SectionComponent } from './components/pages/section/section.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { CarComponent } from './components/car/car.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { CartSummeryComponent } from './components/cart-summery/cart-summery.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BannerComponent } from './components/pages/banner/banner.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { NavbarComponent } from './components/admin-panel/navbar/navbar.component';
import { SidebarComponent } from './components/admin-panel/sidebar/sidebar.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminCarListComponent } from './components/admin-panel/admin-car-list/admin-car-list.component';
import { DataTablesModule } from 'angular-datatables';
import { AdminCarDetailComponent } from './components/admin-panel/admin-car-detail/admin-car-detail.component';
import { CarUpdateComponent } from './components/admin-panel/car-update/car-update.component';
import { AdminCarAddComponent } from './components/admin-panel/admin-car-add/admin-car-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    HomepageComponent,
    HomeComponent,
    FeatureComponent,
    FooterComponent,
    AboutComponent,
    ServiceComponent,
    SectionComponent,
    ContactComponent,
    CarComponent,
    CarDetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    BrandFilterComponent,
    CartSummeryComponent,
    RentalAddComponent,
    PaymentComponent,
    BannerComponent,
    BrandAddComponent,
    AdminPanelComponent,
    NavbarComponent,
    SidebarComponent,
    AdminCarListComponent,
    AdminCarDetailComponent,
    CarUpdateComponent,
    AdminCarAddComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
    }),
  ],

  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
