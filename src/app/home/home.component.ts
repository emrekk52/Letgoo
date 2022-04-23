import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/City';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cityService: CityService,private auth:AuthService) { }
  city: Observable<City>
  cities: City[]
  ngOnInit() {
    this.city = this.getCity();
    this.getCities().subscribe(cts => this.cities = cts);
  }

  getCity(): Observable<City> {
    let user:User=this.auth.getCurrentUser();
    return this.cityService.getCity(user.city_id)
  }

  getCities(): Observable<City[]> {

    return this.cityService.getCities()
  }

}
