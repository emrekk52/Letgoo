import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor() { }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  ngOnInit() {
  }

}
