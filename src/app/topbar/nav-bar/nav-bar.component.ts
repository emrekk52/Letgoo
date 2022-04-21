import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth:AuthService) { }

  profile: Profile

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {

    let user = this.auth.getCurrentUser()

    return this.auth.getUserProfile(user.id).subscribe(data => { 
      this.profile = data
     }
    )
  }

}
