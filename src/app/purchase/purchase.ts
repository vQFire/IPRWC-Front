import {User} from "../security/user";
import {Product} from "../product-crud/product";

export interface Purchase {
  id: number
  user: User
  productPurchases: [
    {
      id: number
      product: Product
      amount: number
    }
  ]
  totalPrice: number
  createdAt: Date
}
