import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products
    })
  }
}
