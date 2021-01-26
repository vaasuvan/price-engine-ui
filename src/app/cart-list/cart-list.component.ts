import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product-model';
import {Price} from '../model/price-model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  productCart: Array<Product> = [];
  subTotalPrice: number = 0;
  totalPrice: number = 0;
  shipping: number = 50;
  productModel = new Product(undefined, '', undefined, undefined, undefined, undefined);
  price = new Price(undefined, '', undefined, undefined, undefined, undefined);

  constructor(private productService: ProductService) {
  }

  get data(): Product[] {
    return this.productService.productCart;
  }

  ngOnInit(): void {
    this.getCartProduct();
    this.productService.productCart.forEach(element => {
      element.ultimatePrice = 0;
      console.log('Checking data injection between different component ' + element.productName);
    });
  }

  // tslint:disable-next-line:typedef
  getCartProduct() {
    this.productCart = this.productService.productCart;
  }

  // tslint:disable-next-line:typedef
  calculatePrice(value: string, product: Product) {
    // tslint:disable-next-line:radix
    product.quantity = value === '' ? 0 : parseInt(value);
    if (product.id !== undefined && product.quantity !== undefined) {
      this.productService.calculatePrice(product.id, product.quantity).subscribe((data: Price) => {
        console.log(data);
        this.price = data;
        product.ultimatePrice = this.price.ultimatePrice;
        this.calculateTotalPrice();
        console.log(this.price);
      });
    }
  }

  // tslint:disable-next-line:typedef
  calculateTotalPrice() {
    this.subTotalPrice = 0;
    if (this.productCart.length > 0) {
      this.productCart.forEach(product => {
        if (product.ultimatePrice !== undefined) {
          this.subTotalPrice = this.subTotalPrice + product.ultimatePrice;
          this.totalPrice = this.subTotalPrice + this.shipping;
        }
      });
    }
  }

  // tslint:disable-next-line:typedef
  removeCartItem(product) {
    this.productService.removeLocalCartProduct(product);
  }
}
