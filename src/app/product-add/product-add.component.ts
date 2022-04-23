import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, UploadTask } from '@firebase/storage';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';


const GET_CATEGORY_URL = `${environment.API_CATEGORY_URL}/GetCategories`

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) { }



  ngOnInit() {

    this.getCategories()
  }

  

  processFile(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      for (let i = 0; i < File.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(target.files[i]);
        reader.onload = (events: any) => {
          if (events) {
            var t: string = events.target.result;
            this.selectedPhotos.push(t)
          }
        }
      }

    }

  }

  categories: Category[]

  getCategories() {

    this.http.get<Category[]>(GET_CATEGORY_URL).subscribe(data =>
      this.categories = data)
  }

  description: string = ""
  header: string = ""
  category_id: number
  price: number
  selectedPhotos: string[] = [];

  descriptionMessage: string
  headerMessage: string
  priceMessage: string
  chooseMessage: string
  resultMessage: string

  setCategoryId(event: any) {
    this.category_id = event.target.value
  }

  addProduct() {

    this.headerMessage = ""
    this.priceMessage = ""
    this.descriptionMessage = ""
    this.chooseMessage = ""

    if (this.header == "") { this.headerMessage = "*Başlık girilmesi zorunludur"; return; }
    if (this.price == undefined || this.price == null) { this.priceMessage = "*Fiyat girilmek zorundadır"; return; }
    if (this.description == "") { this.descriptionMessage = "*Açıklama girilmesi zorunludur"; return; }
    if (this.selectedPhotos.length == 0) { this.chooseMessage = "*Fotoğraf eklenmesi zorunludur"; return; }


    var pr = new Product();

    pr.category_id = this.category_id
    pr.description = this.description
    pr.header = this.header
    pr.price = this.price
    pr.image_list = this.selectedPhotos
    pr.user_id = this.auth.getCurrentUserId()

    this.productService.addProduct(pr).subscribe(data => {
      console.log(data)

      if (data != null) {
        this.resultMessage = "Ürün başarılı şekilde eklendi.. Şu anda ürün sayfasına yönlendiriliyorsunuz"
        setTimeout(() => {
          this.router.navigate(['product-detail'], { state: { id: Number(data) } });
        }, 2000)
      }else{
        this.resultMessage = "Ürün eklenirken bir sorunla karşılaşıldı. Lütfen tekrar deneyin"
      }

    });

  }



}


