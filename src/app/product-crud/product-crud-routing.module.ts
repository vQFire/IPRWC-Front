import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./product/product.component";
import {AuthenticationGuard} from "../security/authentication.guard";
import {Role} from "../security/role";
import {CreateProductComponent} from "./create-product/create-product.component";
import {ProductShopComponent} from "./product-shop/product-shop.component";

const routes: Routes = [
  {
    path: "admin/product/create",
    component: CreateProductComponent,
    canActivate: [AuthenticationGuard],
    data: {
      expectedRole: Role.ROLE_ADMIN
    }
  },
  {
    path: "product/:name",
    component: ProductComponent,
    canActivate: [AuthenticationGuard],
    data: {
      expectedRole: Role.ROLE_MODERATOR
    }
  },
  {
    path: "admin/product",
    component: ProductsComponent,
    canActivate: [AuthenticationGuard],
    data: {
      expectedRole: Role.ROLE_MODERATOR
    }
  },
  {
    path: "product",
    component: ProductShopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCrudRoutingModule { }
