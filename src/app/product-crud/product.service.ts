import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "./product";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiURL: string;
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL + "/product"
  }

  getAllProducts () {
    this.http.get<Product[]>(this.apiURL).subscribe(products => {
      this.products.next(products)
    })

    return this.products
  }

  filterProducts (filters: string[]) {
    const params = "?" + filters.join("&")

    this.http.get<Product[]>(this.apiURL + params).subscribe(products => {
      this.products.next(products)
    })
  }

  getProduct (name: string) {
    return this.http.get<Product>(this.apiURL + "/" + name)
  }

  createProduct (product: Product) {
    return this.http.post<Product>(this.apiURL + "/create", product)
  }

  updateProduct (product: Product) {
    return this.http.put<Product>(this.apiURL + "/update", product)
  }

  deleteProduct (name: string) {
    return this.http.delete(`${this.apiURL}/${name}/delete`)
  }
}
