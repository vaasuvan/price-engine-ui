import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../model/product-model';
import {ToasterService} from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCart: Array<Product> = [];
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line:typedef
  getAllProducts() {
    console.log('service call for all records')
    return this.http.get(`${environment.baseURL}/products`);
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
  calculateFiftyPrice(productId: number) {
    console.log('========calculating 50 products prices=============' + productId);
    return this.http.get(`${environment.baseURL}/price` + '/' + productId);
  }

  // tslint:disable-next-line:typedef
  calculatePrice(productId: number, quantity: number) {
    console.log('========calculating each products price=============' + productId);
    return this.http.get(`${environment.baseURL}/price` + '/' + productId + '/' + quantity);
  }

  // tslint:disable-next-line:typedef
  addToCart(product: Product) {
    if (this.productCart.length === 0){
      this.productCart.push(product);
    }else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.productCart.length; i++) {
        if (this.productCart[i].id !== product.id) {
          this.productCart.push(product);
          break;
        }
      }
    }
    console.log('localstorage data...' + product);
    // return this.http.post(`${environment.baseURL}/cart`, payload);
  }
  // Removing cart from local
  // tslint:disable-next-line:typedef
  removeLocalCartProduct(product: Product) {
    // const products: Product[] = JSON.parse(localStorage.getItem('active_item'));
    for (let i = 0; i < this.productCart.length; i++) {
      if (this.productCart[i].id === product.id) {
        this.productCart.splice(i, 1);
        break;
      }
    }
  }
}
