import { Component, OnInit } from '@angular/core';
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
  productModel = new Product('', '', '', '', '');
  Price; price = new Price('', '', '', '', '', '');
  constructor(private productService: ProductService) { }

  get data(): Product[]{
    return this.productService.productCart;
  }
  ngOnInit(): void {
    this.getCartProduct();
    this.productService.productCart.forEach(element => {
      console.log('Checking data injection between different component ' + element.productName);
    });
  }

  // tslint:disable-next-line:typedef
  getCartProduct(){
      this.productCart = this.productService.productCart;
  }

  // tslint:disable-next-line:typedef
  calculatePrice(productModel) {
    console.log('==========' + productModel.id);
    console.log('==========' + productModel.quantity);
    if (this.productModel.id !== '' && this.productModel.quantity !== '') {
      this.productService.calculatePrice(this.productModel.id, this.productModel.quantity).subscribe((data: Price) => {
        console.log(data);
        this.price = data;
        console.log(this.price);
      });
    }
  }
}
