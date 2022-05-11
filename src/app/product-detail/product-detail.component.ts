import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Message } from '../models/message';
import { Product } from '../models/Product';
import { Profile } from '../models/Profile';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  myId: number
  id: number
  photos: any[]
  user: Profile
  product: Product
  _iframe: any

  constructor(private messageService: MessageService, private router: Router, private productService: ProductService, private auth: AuthService, private _sanitizer: DomSanitizer) {

    this.id = this.router.getCurrentNavigation()?.extras?.state!['id'];
    this.myId = this.auth.getCurrentUserId()
  }


  getProductById() {
    this.productService.getProductById(this.id).subscribe(data => {

      this._iframe = data.user.iframe

      this.user = data.user;
      this.product = data.product;
      this.photos = data.product.image_list.map(m => this.sanitizer(m))
      if (data.user.photo_url == null) { this.user.photo_url = "../../../assets/user.svg" }

    })
  }

  ngOnInit() {
    this.getProductById();
  }

  sanitizer(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  goToUserProfile() {
    this.router.navigate(['profile'], { state: { user: this.user } });
  }


  message: string


  sendMessage() {

    let message = new Message();

    message.receiver_id = this.user.id
    message.sender_id = this.auth.getCurrentUserId()
    message.message = this.message
    message.product_id = this.product.id

    this.messageService.postMessage(message).subscribe(data => {

      console.log(data)
      if (data != null)
        this.router.navigate(['message'], { state: { product_id: this.product.id } });

    })


  }


}
