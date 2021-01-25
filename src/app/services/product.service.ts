import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  // tslint:disable-next-line:typedef
  getAllProducts() {
    return this.http.get(`${environment.baseURL}/products`);
  }
  // tslint:disable-next-line:typedef
  addToCart(payload) {
    return this.http.post(`${environment.baseURL}/cart`, payload);
  }
  // tslint:disable-next-line:typedef
  getCartItems() {
    return this.http.get(`${environment.baseURL}/cart`);
  }
  // tslint:disable-next-line:typedef
  increaseQty(payload) {
    return this.http.post(`${environment.baseURL}/cart`, payload);
  }
  // tslint:disable-next-line:typedef
  emptyCart() {
    return this.http.delete(`${environment.baseURL}/cart/empty-cart`);
  }

  // tslint:disable-next-line:typedef
  calculateFiftyPrice(productId: string) {
    console.log('========calculating 50 products prices=============' + productId);
    return this.http.get(`${environment.baseURL}/price` + '/' + productId);
  }

  calculatePrice(productId: string, quantity: string) {
    console.log('========calculating each products price=============' + productId);
    return this.http.get(`${environment.baseURL}/price` + '/' + productId + '/' + quantity);
  }
}
