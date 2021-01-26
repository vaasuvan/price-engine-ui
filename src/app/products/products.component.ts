import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = [];
  productsWithPrice = [];
  productModel = new Product(undefined, '', undefined, undefined, undefined, undefined);

  constructor(private productService: ProductService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      console.log('initializing all record from backend');
      this.products = data;
    });
    setTimeout(() => {
      if (this.products.length > 0) {
        this.products.forEach((product, i) => {
          if (i === 0) {
            this.productModel.id = product.id;
          }
        });
      }
      this.calculateFiftyPrice();
    }, 500);
  }

  // tslint:disable-next-line:typedef
  calculateFiftyPrice() {
    console.log('retrieving 50 records calculated values');
    if (this.productModel.id !== undefined) {
      this.productService.calculateFiftyPrice(this.productModel.id).subscribe((data: any[]) => {
        console.log(data);
        this.productsWithPrice = data;
      });
    }
  }
}
