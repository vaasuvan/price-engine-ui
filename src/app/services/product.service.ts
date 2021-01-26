import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../model/product-model';
import {ToasterService} from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private toastrService: ToasterService) {}
  // tslint:disable-next-line:typedef
  getAllProducts() {
    return this.http.get(`${environment.baseURL}/products`);
  }
  // tslint:disable-next-line:typedef
  addToCart(data: Product) {
    const a: Product[] = JSON.parse(localStorage.getItem('active_item')) || [];
    console.log('localstorage data...' + data);
    a.push(data);
    console.log('pushed to local storage');    // this.toastrService.wait(
    //   'Adding Product to Cart',
    //   'Product Adding to the cart'
    // );
    setTimeout(() => {
      localStorage.setItem('active_item', JSON.stringify(a));
    }, 500);
    // return this.http.post(`${environment.baseURL}/cart`, payload);
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

  // tslint:disable-next-line:typedef
  calculatePrice(productId: string, quantity: string) {
    console.log('========calculating each products price=============' + productId);
    return this.http.get(`${environment.baseURL}/price` + '/' + productId + '/' + quantity);
  }

  // Removing cart from local
  // tslint:disable-next-line:typedef
  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem('active_item'));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem('active_item', JSON.stringify(products));
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem('active_item')) || [];
    console.log(products);
    return products;
  }
}
