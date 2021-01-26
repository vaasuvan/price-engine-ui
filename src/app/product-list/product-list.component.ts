import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product-model';
import {ProductService} from '../services/product.service';
import set = Reflect.set;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) {}

    // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAllProducts();
  }

  // tslint:disable-next-line:typedef
  removeCartProduct(product: Product) {
    this.productService.removeLocalCartProduct(product);

    // Recalling
    this.getAllProducts();
  }

  // tslint:disable-next-line:typedef
  getAllProducts(){
    this.productService.getAllProducts().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }

  // tslint:disable-next-line:typedef
  addToCart(product: Product) {
    console.log('adding product to cart');
    if (this.productService.productCart.indexOf(product) === -1) {
      this.productService.productCart.push(product);
    }
    // this.productService.productCart.push(product);
  }

}
