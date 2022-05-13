import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { City } from '../models/City';
import { Product } from '../models/Product';
import { resultProduct } from '../models/resultProduct';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {


  products: Product[]
  city: City
  category: Category
  header: string


  constructor(private router: Router,
    private productService: ProductService
  ) {
    this.city = this.router.getCurrentNavigation()?.extras?.state!['city'];
    this.category = this.router.getCurrentNavigation()?.extras?.state!['category']
  }



  ngOnInit() {


    if (this.city == null) {
      this.header = this.category.name
      this.getCategoryByProduct(this.category.id).subscribe(data => {
        this.products = data.productList
        console.log(data.productList)
        
      })
    }
    else {
      this.header = this.city.city_name
      this.getCityByProduct(this.city.id).subscribe(data => {
        this.products = data.productList
        
      })
    }
  }

  getCategoryByProduct(category_id: number): Observable<resultProduct> {

    return this.productService.getProductByCategory(category_id, 20)
  }

  getCityByProduct(city_id: number): Observable<resultProduct> {

    return this.productService.getProductByCity(city_id)
  }

  routeDetail(id: number) {
    this.router.navigate(['product-detail'], { state: { id: id } });
  }

}
