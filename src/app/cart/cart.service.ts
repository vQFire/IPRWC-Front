import { Injectable } from '@angular/core';
import {Product} from "../product-crud/product";
import {CartItem} from "./cartItem";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {AuthenticationService} from "../security/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([])
  loggedIn = false
  private readonly apiURL;

  constructor(private http: HttpClient,
              private auth: AuthenticationService) {
    this.apiURL = environment.apiURL

    this.loadCart()

    auth.userIsLoggedIn.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn
    })
  }

  addToCart (toBeAddedProduct: Product) {
    const cart = this.cart.value
    let foundProduct = false

    for (const [index, cartItem] of cart.entries()) {
      if (cartItem.product.id === toBeAddedProduct.id) {
        cart[index].amount += 1

        foundProduct = true
        break
      }
    }

    if (!foundProduct) {
      cart.push({
        product: toBeAddedProduct,
        amount: 1
      })
    }

     this.loggedIn && this.http.get(this.apiURL + "/user/cart/" + toBeAddedProduct.id).subscribe(() => console.log("Add product"))

    this.cart.next(cart);
  }

  removeItem (product: Product, deleteItem: boolean = false) {
    const cart = this.cart.value

    for (const [index, cartItem] of cart.entries()) {
      if (cartItem.product.id === product.id) {
        cart[index].amount -= 1

        if (cart[index].amount === 0 || deleteItem) {
          cart.splice(index, 1)
        }

        break
      }

    }

    this.loggedIn && this.http.delete(this.apiURL + "/user/cart/" + product.id).subscribe(() => console.log("Delete product"))

    this.cart.next(cart)
  }

  getTotalItems (): number {
    let total = 0

    for (const cartItem of this.cart.value) {
      total += cartItem.amount
    }

    return total
  }

  loadCart () {
    return this.http.get<Cart>(this.apiURL + "/user/cart")
      .pipe(tap(cart => {
        if (this.cart.value.length > 0) return;

        this.cart.next(cart.products)
      }))
  }
}

interface Cart {
  id?: number
  products: CartItem[]
}
