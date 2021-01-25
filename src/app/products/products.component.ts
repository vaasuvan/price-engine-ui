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

  productModel = new Product('1', '', '', '', '');

  constructor(private productService: ProductService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }

  // tslint:disable-next-line:typedef
  calculateFiftyPrice(productModel) {
    if (this.productModel.id !== '') {
      this.productService.calculateFiftyPrice(this.productModel.id).subscribe((data: any[]) => {
        console.log(data);
        this.productsWithPrice = data;
      });
    }
  }

}
