import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Purchase} from "./purchase";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiURL: string

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL + "/purchase"
  }

  makePurchase (products: object[]) {
    return this.http.post<Purchase>(this.apiURL + "/create", {products})
  }

  getAllPurchases () {
    return this.http.get<Purchase[]>(this.apiURL)
  }

  getPurchase (id: number) {
    return this.http.get<Purchase>(this.apiURL + "/" + id)
  }
}
