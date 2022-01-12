import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {Product} from "../../product-crud/product";
import {PurchaseService} from "../../purchase/purchase.service";

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {
  cart: ProductCart[] = []
  tableOptions = {
    0: {
      hidden: true
    }
  }

  constructor(private cartService: CartService,
              private purchaseService: PurchaseService) {
    cartService.cart.forEach(cartItem => [
      this.cart.push({
        ...cartItem.product,
        amount: cartItem.amount
      })
    ])
  }

  ngOnInit(): void {
  }

  purchase(): void {
    const products = []

    for (const cartItem of this.cart) {
      products.push({
        id: cartItem.id,
        amount: cartItem.amount}
      )
    }

    this.purchaseService.makePurchase(products)
  }
}

interface ProductCart extends Product{
  amount: number
}
