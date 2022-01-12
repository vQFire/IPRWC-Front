import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiURL: string

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL + "/purchase"
  }

  makePurchase (products: object[]) {
    this.http.post<any>(this.apiURL + "/create", {products}).subscribe(result => {
      console.log(result)
    })
  }
}
