import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartOverviewComponent } from './cart-overview/cart-overview.component';
import {ComponentsModule} from "../components/components.module";


@NgModule({
  declarations: [
    CartOverviewComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ComponentsModule
  ]
})
export class CartModule { }
