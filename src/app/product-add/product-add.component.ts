import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, UploadTask } from '@firebase/storage';
import { environment } from 'src/environments/environment';
import { CarExtension } from '../models/carExtension';
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

    this.http.get<Category[]>(GET_CATEGORY_URL).subscribe(data => {

      let one = data[0]
      let two = data[1]

      this.categories = data
      this.categories[0] = two
      this.categories[1] = one
      this.category_id = data[0].id

      this.chooseCarColor = this.carColorList[0]
      this.chooseCarEngine = this.carEngineList[0]
      this.chooseCarFuel = this.carFuelList[0]
      this.chooseCarGear = this.carGearList[0]
      this.chooseCarTraction = this.carTractionList[0]
      this.chooseCarType = this.carTypeList[0]
      this.chooseCarYear = this.carYearList[0]
    })
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

  chooseCarType: string
  chooseCarEngine: string
  chooseCarGear: string
  chooseCarTraction: string
  chooseCarFuel: string
  chooseCarYear: number
  chooseCarColor: string
  chooseCarKm: number

  carKmMessage: string


  carTypeList: string[] = ["Sedan", "Hatchback", "Station Wagon", "SUV", "Cabrio", "Pick up"]
  carEngineList: string[] = ["50+", "75+", "120+", "200+", "350+", "500+"]
  carGearList: string[] = ["Manuel", "Yarı otomatik", "Otomatik"]
  carTractionList: string[] = ["Önden çekiş", "Arkadan itiş", "Dört çeker"]
  carFuelList: string[] = ["Dizel", "Benzin", "Benzin & LPG"]
  carYearList: number[] = this.getYearList()
  carColorList: string[] = ["Beyaz", "Siyah", "Kahverengi", "Turuncu", "Kırmızı", "Bej", "Gümüş", "Mavi", "Sarı", "Yeşil", "Kurşun", "Mor"]

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

    if (this.category_id == 13) {
      if (this.chooseCarKm == null) {
        this.carKmMessage = "*Km bilgisi boş bırakılamaz"
        return;
      }

      let carExtension = new CarExtension()
      carExtension.carColor = this.chooseCarColor
      carExtension.carEngine = this.chooseCarEngine
      carExtension.carFuel = this.chooseCarFuel
      carExtension.carGear = this.chooseCarGear
      carExtension.carKm = this.chooseCarKm
      carExtension.carYear = this.chooseCarYear
      carExtension.carTraction = this.chooseCarTraction
      carExtension.carType = this.chooseCarType

      pr.car_extension = carExtension
    }



    this.productService.addProduct(pr).subscribe(data => {

      if (data != null) {
        this.resultMessage = "Ürün başarılı şekilde eklendi.. Şu anda ürün sayfasına yönlendiriliyorsunuz"
        setTimeout(() => {
          this.router.navigate(['product-detail'], { state: { id: Number(data) } });
        }, 2000)
      } else {
        this.resultMessage = "Ürün eklenirken bir sorunla karşılaşıldı. Lütfen tekrar deneyin"
      }

    });

  }


  removeSelectedPhotos(index: number) {
    this.selectedPhotos.splice(index, 1)
  }



  getYearList(): number[] {
    var str: number[] = [];

    for (var i = 2022; i >= 1944; i--) {
      str.push(i)
    }

    return str;

  }


  setChooseCarType(event: any) {
    this.chooseCarType = event.target.value;
  }
  setChooseCarEngine(event: any) {
    this.chooseCarEngine = event.target.value;
  }
  setChooseCarGear(event: any) {
    this.chooseCarGear = event.target.value;
  }
  setChooseCarTraction(event: any) {
    this.chooseCarTraction = event.target.value;
  }
  setChooseCarFuel(event: any) {
    this.chooseCarFuel = event.target.value;
  }
  setChooseCarYear(event: any) {
    this.chooseCarYear = event.target.value;
  }
  setChooseCarColor(event: any) {
    this.chooseCarColor = event.target.value;
  }



}






