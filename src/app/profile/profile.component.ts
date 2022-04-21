import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
    private api: ApiService,
    private productService: ProductService
  ) { }


  profile: Profile
  image: string

  ngOnInit() {
    this.getProfile();
    this.getMyProducts();
  }

  getProfile() {

    let user = this.auth.getCurrentUser()

    return this.auth.getUserProfile(user.id).subscribe(data => {
      this.profile = data
      this.image = data.image
    }
    )
  }

  logout() {
    this.auth.logOut()
  }



  onFileSelected(event: Event) {

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      var task = this.api.uploadPhoto(target.files[0])
      this.uploadPhoto(task)
    }
  }


  uploadPhoto(uploadTask: UploadTask) {
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
  }

  photoSaveDbInfo: string

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

  myProducts: Product[]

  getMyProducts() {
    let myId = Number(this.auth.getCurrentUserId())
    this.productService.getMyProducts(myId).subscribe(data => {
      this.myProducts = data.productList
      console.log(data)
    })

  }

  changeProductStateMessage: string
  _product_id:number

  retryPublishOrDown(state: number, product_id: number) {
    this._product_id=product_id
    this.productService.changeProductState(state, product_id).subscribe(data => {
      this.changeProductStateMessage = data;
      if (data != "*Ürünün id bilgisine ulaşılamadı")
        setTimeout(() => {
          this.changeProductStateMessage = "";
         this.getMyProducts()
        }, 2000);
    })
  }


}
