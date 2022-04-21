import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { resultProduct } from '../models/resultProduct';

const GET_PRODUCT_BY_ID_URL = `${environment.API_PRODUCT_URL}/GetProductById`;
const GET_MY_PRODUCT_URL = `${environment.API_PRODUCT_URL}/GetMyProducts`;
const UPDATE_PRODUCT_STATE_URL = `${environment.API_PRODUCT_URL}/UpdateProductState`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

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


}
