import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './services/alertify.service';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth-guard';
import { NavBarComponent } from './topbar/nav-bar/nav-bar.component';
import { CityService } from './services/city.service';
import { FormatCityPipe } from './pipes/format-city.pipe';
import { ProfileComponent } from './profile/profile.component';
import { ApiService } from './services/api.service';

import { ProductService } from './services/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddComponent } from './product-add/product-add.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    FormatCityPipe,
    ProfileComponent,
      ProductAddComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  providers: [AlertifyService, AuthGuard, AuthService, CityService, ApiService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
