import {Product} from "../product-crud/product";

export interface CartItem {
  product: Product
  amount: number
}
