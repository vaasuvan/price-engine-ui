import { Component, OnInit } from '@angular/core';
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
  Price; price = new Price('', '', '', '', '', '');
  pro = {};
  productModel = new Product('', '', '', '', '');
  carts;
  cartDetails;
  constructor(private productService: ProductService) {}
  _getCart(): void {
    this.productService.getCartItems().subscribe((data: any) => {
      this.carts = data.data;
      // this.cartDetails = data.data;
      console.log(this.carts);
    });
  }
  _increamentQTY(id, quantity): void {
    const payload = {
      productId: id,
      quantity,
    };
    this.productService.increaseQty(payload).subscribe(() => {
      this._getCart();
      alert('Product Added');
    });
  }
  _emptyCart(): void {
    this.productService.emptyCart().subscribe(() => {
      this._getCart();
      alert('Cart Emptied');
    });
  }
  ngOnInit(): void {
    this.getAllProducts()
    this._getCart();
  }

  // tslint:disable-next-line:typedef
  getAllProducts(){
    this.productService.getAllProducts().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }
  // tslint:disable-next-line:typedef
  calculatePrice(productModel) {
    console.log('==========' + this.productModel.id);
    console.log('==========' + this.productModel.quantity);
    if (this.productModel.id !== '' && this.productModel.quantity !== '') {
      this.productService.calculatePrice(this.productModel.id, this.productModel.quantity).subscribe((data: Price) => {
        console.log(data);
        this.price = data;
        console.log(this.price);
      });
    }
  }
}
