import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product-model';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Products to Cart';

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
    this.productService.addToCart(product);
  }

}
