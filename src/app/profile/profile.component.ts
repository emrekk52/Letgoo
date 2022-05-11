import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { getDownloadURL, UploadTask } from '@firebase/storage';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  constructor(private auth: AuthService,

    private productService: ProductService,
    private router: Router
  ) {


    if (this.router.getCurrentNavigation()?.extras.state != undefined)
      this.user = this.router.getCurrentNavigation()?.extras?.state!['user'];


  }

  checkUserIsMy():boolean{
    return this.user.id==this.auth.getCurrentUser().id;
  }


  profile: Profile
  image: any
  user: User

  changeProductStateMessage: string
  _product_id: number
  photoSaveDbInfo: string
  myProducts: Product[]

  ngOnInit() {
    if (this.user == undefined)
      this.user = this.auth.getCurrentUser()
    this.getProfile();
    this.getMyProducts();

  }

  getProfile() {


    return this.auth.getUserProfile(this.user.id).subscribe(data => {
      this.profile = data

      if (this.profile.photo_url == null)
        this.image = "../../../assets/user.svg"
      else
        this.image = data.photo_url

    }
    )
  }

  logout() {
    this.auth.logOut()
  }



  onFileSelected(event: Event) {

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {

      var reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = (events: any) => {
        if (events) {
          var selectedPhoto: string = events.target.result;
          this.saveDbPhoto(selectedPhoto)
        }
      }


    }
  }


  /* uploadPhoto(uploadTask: UploadTask) {
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.saveDbPhoto(downloadURL);
        });
      }
    );
  } */



  saveDbPhoto(downloadUrl: string) {
    this.image = downloadUrl;
    this.auth.savePhotoForDb(downloadUrl).subscribe(data => {
      console.log(data)
      this.photoSaveDbInfo = data;
      setTimeout(() => {
        this.photoSaveDbInfo = "";
        this.refresh();
      }, 2000);
    })
  }

  refresh() {
    window.location.reload();
  }



  getMyProducts() {
    let myId = Number(this.user.id)
    this.productService.getMyProducts(myId).subscribe(data => {
      this.myProducts = data.productList

    })

  }



  retryPublishOrDown(state: number, product_id: number) {
    this._product_id = product_id
    this.productService.changeProductState(state, product_id).subscribe(data => {
      this.changeProductStateMessage = data;
      if (data != "*Ürünün id bilgisine ulaşılamadı")
        setTimeout(() => {
          this.changeProductStateMessage = "";
          this.getMyProducts()
        }, 1000);
    })
  }

  routeDetail(id: number) {
    this.router.navigate(['product-detail'], { state: { id: id } });

  }


}
