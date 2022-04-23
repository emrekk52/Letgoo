import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { Profile } from '../models/Profile';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  myId: number
  id: number
  photos: string[]
  user: Profile
  product: Product
  constructor(private router: Router, private productService: ProductService, private auth: AuthService) {

    this.id = this.router.getCurrentNavigation()?.extras?.state!['id'];
    this.myId = this.auth.getCurrentUserId()
  }


  getProductById() {
    this.productService.getProductById(this.id).subscribe(data => {

      console.log(data)
      this.user = data.user;
      this.product = data.product;
      this.photos = data.product.image_list

    })
  }

  ngOnInit() {
    this.getProductById();
  }

}
