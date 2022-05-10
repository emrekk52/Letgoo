import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { City } from '../models/City';
import { Product } from '../models/Product';
import { resultProduct } from '../models/resultProduct';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  user: User
  city: Observable<City>
  cities: City[]

  productList: Product[]
  productRandomList: Product[]

  constructor(private cityService: CityService,
     private auth: AuthService,
     private productService: ProductService,
     private router:Router
     ) { }


  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    this.city = this.getCity();
    this.getCities().subscribe(cts => this.cities = cts);
    this.getProductByCity().subscribe(prd => this.productList = prd.productList);
    this.getProductByRandom().subscribe(rndPrd => this.productRandomList = rndPrd.productList);
  
  }

  getCity(): Observable<City> {

    return this.cityService.getCity(this.user.city_id)
  }

  getCities(): Observable<City[]> {
    return this.cityService.getCities()
  }

  getProductByCity(): Observable<resultProduct> {
    return this.productService.getProductByCity(this.user.city_id)
  }

  getProductByRandom(): Observable<resultProduct> {
    return this.productService.getProductByRandom(this.user.id,10)
  }

  routeDetail(id: number) {
    this.router.navigate(['product-detail'], { state: { id: id } });

  }

  routeFilterCityProduct(city:City) {
    console.log("seçilen city "+city.id)
    this.router.navigate(['filter-product'], { state: { city: city } });

  }

  routeFilterCategoryProduct(category:Category) {
    this.router.navigate(['filter-product'], { state: { category: category } });

  }

}
