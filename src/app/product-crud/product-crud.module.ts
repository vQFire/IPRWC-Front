import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCrudRoutingModule } from './product-crud-routing.module';
import { ProductsComponent } from './products/products.component';
import {ComponentsModule} from "../components/components.module";
import { ProductComponent } from './product/product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductShopComponent } from './product-shop/product-shop.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    CreateProductComponent,
    ProductShopComponent
  ],
  imports: [
    CommonModule,
    ProductCrudRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductCrudModule { }
