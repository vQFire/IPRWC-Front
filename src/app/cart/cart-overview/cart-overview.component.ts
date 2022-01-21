import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {Product} from "../../product-crud/product";
import {PurchaseService} from "../../purchase/purchase.service";
import {AuthenticationService} from "../../security/authentication.service";
import {Router} from "@angular/router";
import {Options} from "../../components/table/tableOptions";

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {
  cart: ProductCart[] = []
  tableOptions: Options = {
    0: {
      hidden: true
    },
    3: {
      hidden: true
    },
    4: {
      hidden: true
    },
    5: {
      hidden: true
    },
    product: {
      price: 2,
      amount: 6
    },
    sumTotals: [6, 7]
  }

  constructor(private cartService: CartService,
              private purchaseService: PurchaseService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe(cart => {
      this.cart = []

      cart.forEach(cartItem => {
        this.cart.push({
          ...cartItem.product,
          amount: cartItem.amount
        })
      })
    })
  }

  purchase(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl("/login?redirect=/cart")
    }

    const products = []

    for (const cartItem of this.cart) {
      products.push({
        id: cartItem.id,
        amount: cartItem.amount}
      )
    }

    this.purchaseService.makePurchase(products).subscribe(() => {
      this.cart = []

      this.router.navigateByUrl("/purchase", {replaceUrl: true})
    })
  }
}

interface ProductCart extends Product{
  amount: number
}
