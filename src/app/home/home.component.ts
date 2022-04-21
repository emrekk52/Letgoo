import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/City';
import { User } from '../models/User';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cityService: CityService) { }
  city: Observable<City>
  cities: City[]
  ngOnInit() {
    this.city = this.getCity();
    this.getCities().subscribe(cts => this.cities = cts);
  }

  getCity(): Observable<City> {
    const user: User = JSON.parse(localStorage.getItem('user')!)
    return this.cityService.getCity(user.city_id)
  }

  getCities(): Observable<City[]> {

    return this.cityService.getCities()
  }

}
