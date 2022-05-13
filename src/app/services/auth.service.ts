import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { loginResult } from '../models/loginResult';
import { Profile } from '../models/Profile';
import { updatePhoto } from '../models/updatePhoto';
import { User } from '../models/User';
import { userLogin } from '../models/userLogin';
import { AlertifyService } from './alertify.service';


const USER_LOGIN_URL = `${environment.API_AUTH_URL}/login`
const USER_REGISTER_URL = `${environment.API_AUTH_URL}/register`
const USER_PROFILE_URL = `${environment.API_PROFILE_URL}/GetProfile`
const USER_UPDATE_URL = `${environment.API_PROFILE_URL}/AddPhoto`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router,
    private alertify: AlertifyService
  ) { }


  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService()



  async login(userLogin: userLogin) {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")


    let loginResult = await this.http
      .post<loginResult>(USER_LOGIN_URL, userLogin, { headers: headers }).toPromise();

    if (loginResult?.status == true) {
      this.decodedToken = this.jwtHelper.decodeToken(loginResult?.message)
      this.saveToken(loginResult?.message)
      this.userToken = loginResult?.message
      let user: any = loginResult.user
      localStorage.setItem('userProfile', JSON.stringify(user))
      this.alertify.success("Giriş yapıldı")
    }


    return loginResult

  }

  saveToken(token: any) {
    localStorage.setItem('token', token);
  }

  getCurrentUser():User{
    const user: User = JSON.parse(localStorage.getItem('userProfile')!)
    return user
  }

  getCurrentUserId():number{
    const user: User = JSON.parse(localStorage.getItem('userProfile')!)
    return user.id
  }

  getUserProfile(id: number): Observable<Profile> {

    return this.http.get<Profile>(USER_PROFILE_URL + "?=" + id)
  }


  register(user: User) {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")

    return this.http.post<loginResult>(USER_REGISTER_URL, user, { headers: headers })

  }

  logOut() {
    localStorage.removeItem('token');
    //this.router.navigateByUrl('/login');
    window.location.reload();
  }


  loggedIn() {
    return !!localStorage.getItem('token');
  }

 

  get token() { return localStorage.getItem('token')! }


  savePhotoForDb(photoUrl:string){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")

    var _updatePhoto=new updatePhoto();

    _updatePhoto.id=this.getCurrentUserId();
    _updatePhoto.photoUrl=photoUrl;

    return this.http.post<string>(USER_UPDATE_URL, _updatePhoto, { headers: headers })
  }

}
