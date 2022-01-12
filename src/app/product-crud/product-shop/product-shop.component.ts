import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.scss']
})
export class ProductShopComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products
    })
  }

  addToCart (product: Product) {
    this.cartService.addToCart(product)
  }
}
