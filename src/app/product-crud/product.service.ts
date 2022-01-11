import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL + "/product"
  }

  getAllProducts () {
    return this.http.get<Product[]>(this.apiURL)
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
