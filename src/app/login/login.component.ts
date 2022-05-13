import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { userLogin } from '../models/userLogin';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router,) { }

  errorEmail = false
  errorPassword = false

  resultLoginMessage: string
  resultLoginMessageShow: boolean



  login(event: any) {

    this.errorEmail = false
    this.errorPassword = false

    let user = new userLogin()
    user.email = event.target.email.value
    user.password = event.target.password.value


    if (user.email == "") { this.errorEmail = true; return; }
    if (user.password == "") { this.errorPassword = true; return; }


    this.auth.login(user).then(data => {

      if (data?.status) {
        //this.router.navigateByUrl('/home');
        this.refresh()
      } else {
        this.resultLoginMessageShow = true
        this.resultLoginMessage = data?.message!
      }


    })



  }


  refresh() {
    window.location.reload();
  }


  get isAuthenticated() { return this.auth.loggedIn() }

  ngOnInit() {
    if (this.isLogin()) { this.router.navigateByUrl('/home'); }
  }


  isLogin(): boolean {
    return this.auth.loggedIn();
  }


}
