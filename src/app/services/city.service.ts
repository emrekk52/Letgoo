import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/City';


const GET_CITIES_URL = `${environment.API_CITY_URL}/GetCities`;
const GET_CITY_URL = `${environment.API_CITY_URL}/GetCity`;

@Injectable({
  providedIn: 'root'
})
export class CityService {

constructor(private http:HttpClient) { }


getCities(): Observable<City[]> {

  return this.http.get<City[]>(GET_CITIES_URL)
}


getCity(id:number):Observable<City> {

  return this.http.get<City>(`${GET_CITY_URL}?=${id}`)
}



}

