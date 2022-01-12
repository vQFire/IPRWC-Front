import { Injectable } from '@angular/core';
import {Product} from "../product-crud/product";
import {CartItem} from "./cartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = []

  constructor() { }

  addToCart (product: Product) {
    for (const [index, cartItem] of this.cart.entries()) {
      if (cartItem.product.id === product.id) {
        this.cart[index].amount += 1

        return
      }
    }

    this.cart.push({
      amount: 1,
      product
    })
  }

  removeItem (product: Product, deleteItem: boolean = false) {
    for (const [index, cartItem] of this.cart.entries()) {
      if (cartItem.product.id === product.id) {
        cartItem.amount -= 1

        if (cartItem.amount === 0 || deleteItem) {
          this.cart.splice(index, 1)
        }

        return
      }
    }

    console.warn("Product is not in the cart")
  }

  getTotalItems (): number {
    let total = 0

    for (const cartItem of this.cart) {
      total += cartItem.amount
    }

    return total
  }
}
