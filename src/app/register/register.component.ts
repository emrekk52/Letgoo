import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/City';
import { loginResult } from '../models/loginResult';
import { User } from '../models/User';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';






@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private http: HttpClient,
    private alertify: AlertifyService,
    private auth: AuthService,
    private city: CityService,
    private router: Router) { }

  cities: City[] = []
  responseRegister: string

  errorEmailMessage: string
  errorEmail = false
  errorPassword = false
  errorName = false
  errorSurname = false


  ngOnInit() {
    if (this.isLogin()) { this.router.navigateByUrl('/home'); }
    this.city.getCities().subscribe(data => {
      this.cities = data
      console.log(data)
    })
  }


  isLogin(): boolean {
    return this.auth.loggedIn();
  }

  
  cityId: number = 1


  selectChangeHandler(event: any) {

    this.cityId = event.target.value;

  }

  register(name: string, surname: string, email: string, password: string) {

    this.errorEmail = false
    this.errorPassword = false
    this.errorName = false
    this.errorSurname = false

    if (name == "") { this.errorName = true; return; }
    if (surname == "") { this.errorSurname = true; return; }
    if (email == "") { this.errorEmail = true; this.errorEmailMessage = "*E posta alanı gereklidir"; return; }
    if (email.indexOf("@") == -1) { this.errorEmail = true; this.errorEmailMessage = "*Kötü format"; return; }
    if (password == "") { this.errorPassword = true; return; }


    let user = new User();
    user.name = name.trim()
    user.surname = surname.trim()
    user.email = email.trim()
    user.password = password
    user.city_id = this.cityId



    this.auth.register(user).subscribe(data => {

      this.responseRegister = data.message;
      if (data.status == true) {

        setTimeout(() => {
          this.goToLogin()
        }, 2000)

      }

    })



  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
