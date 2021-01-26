import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product-model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartProducts: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCartProduct();
  }

  // tslint:disable-next-line:typedef
  getCartProduct() {
    this.cartProducts = this.productService.getLocalCartProducts();
  }
}
