import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';
import { resultProduct } from '../models/resultProduct';
import { User } from '../models/User';
import { AuthService } from './auth.service';

const GET_PRODUCT_BY_ID_URL = `${environment.API_PRODUCT_URL}/GetProductById`;
const GET_MY_PRODUCT_URL = `${environment.API_PRODUCT_URL}/GetMyProducts`;
const GET_FILTER_CITY_URL = `${environment.API_PRODUCT_URL}/GetProductByCity`;
const GET_PRODUCT_RANDOM_URL = `${environment.API_PRODUCT_URL}/GetProductByRandom`;
const GET_PRODUCT_CATEGORY_URL = `${environment.API_PRODUCT_URL}/GetProductByCategory`;
const UPDATE_PRODUCT_STATE_URL = `${environment.API_PRODUCT_URL}/UpdateProductState`;
const ADD_PRODUCT_URL = `${environment.API_PRODUCT_URL}/AddProduct`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  user:User

  constructor(private http: HttpClient,private auth:AuthService) { this.user=this.auth.getCurrentUser()}

  getProductById(id: number): Observable<resultProduct> {

    return this.http.get<resultProduct>(GET_PRODUCT_BY_ID_URL + "?=" + id);
  }

  getMyProducts(user_id: number): Observable<resultProduct> {

    return this.http.get<resultProduct>(GET_MY_PRODUCT_URL + "?=" + user_id);
  }


  changeProductState(state: number, product_id: number): Observable<string> {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")

    return this.http.post<string>(UPDATE_PRODUCT_STATE_URL, { state, product_id }, { headers: headers });
  }

  addProduct(product: Product): Observable<number> {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")

    return this.http.post<number>(ADD_PRODUCT_URL, product, { headers: headers });
  }


  getProductByCity(city_id: number): Observable<resultProduct> {

    return this.http.get<resultProduct>(GET_FILTER_CITY_URL + "?city_id=" + city_id + "&user_id=" + this.user.id);
  }


  getProductByRandom(user_id: number, size: number): Observable<resultProduct> {

    return this.http.get<resultProduct>(GET_PRODUCT_RANDOM_URL + `?user_id=${user_id}`+"&size="+`${size < 10 ? 20 : size}`);
  }

  getProductByCategory(category_id:number, size: number): Observable<resultProduct> {

    return this.http.get<resultProduct>(GET_PRODUCT_CATEGORY_URL + `?category_id=${category_id}`+"&user_id="+this.user.id+"&size="+`${size < 10 ? 20 : size}`);
  }

}
