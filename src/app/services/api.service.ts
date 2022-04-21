import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable, UploadTask } from '@firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  app = initializeApp(environment.firebaseConfig);







  uploadPhoto(photo: any): UploadTask {

    var n = Date.now();

    const filePath = `photos/${n}`;
    let storage = getStorage(this.app);
    const _ref = ref(storage, filePath)

    const uploadTask = uploadBytesResumable(_ref, photo);



    return uploadTask;



  }

}
