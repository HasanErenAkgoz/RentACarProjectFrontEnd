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
import { HttpClientModule } from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { CartSummeryComponent } from './components/cart-summery/cart-summery.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
