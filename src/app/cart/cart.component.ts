import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product-model';
import {Price} from '../model/price-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  products: any[] = [];
  calculatedPrice: string;
  Price;
  price = new Price(undefined, '', undefined, undefined, undefined, undefined);
  pro = {};
  productModel = new Product(undefined, '', undefined, undefined, undefined, undefined);
  carts;
  cartDetails;

  constructor(private productService: ProductService) {
  }

  _getCart(): void {
    this.productService.getCartItems().subscribe((data: any) => {
      this.carts = data.data;
      // this.cartDetails = data.data;
      console.log(this.carts);
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this._getCart();
  }

  // tslint:disable-next-line:typedef
  getAllProducts() {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }

  // tslint:disable-next-line:typedef
  calculatePrice(productModel) {
    console.log('==========' + this.productModel.id);
    console.log('==========' + this.productModel.quantity);
    if (this.productModel.id !== undefined && this.productModel.quantity !== undefined) {
      this.productService.calculatePrice(this.productModel.id, this.productModel.quantity).subscribe((data: Price) => {
        console.log(data);
        this.price = data;
        console.log(this.price);
      });
    }
  }
}
