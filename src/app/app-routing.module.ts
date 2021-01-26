import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import {ProductListComponent} from './product-list/product-list.component';
import {CartListComponent} from './cart-list/cart-list.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart-list', component: CartListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
